import { Component, OnInit } from '@angular/core';
import { EmployeeBreakInServiceReportService } from './employeeBreakInServiceReport.service';

@Component({
    moduleId: module.id,
    templateUrl: 'employeeBreakInServiceReport.html'

})
export class EmployeeBreakInServiceReportComponent implements OnInit {

    dataLoaded: boolean;
    selectedYear: string;
    selectedControlGroup: string;
    selectedWeekStarting: string;
    selectedWeekEnding: string;

    Years: Array<string>;
    ControlGroups: Array<string>;

    public rows: Array<any> = [];
    public page: number = 1;
    public itemsPerPage: number = 5;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    public columns: Array<any> = [

        { title: 'Employee Name', className: 'va-m', name: 'FirstName' },
        { title: 'SSN', className: 'va-m', name: 'SSN' },
        { title: 'Service Status', className: 'va-m', name: 'ServiceStatus' },
        { title: 'Week Starting', className: 'va-m', name: 'WeekStarting' },
        { title: 'Week Ending', className: 'va-m', name: 'WeekEnding' },
        { title: 'Week Count', className: 'va-m', name: 'WeekCount' },
        { title: 'Control Group', className: 'va-m', name: 'ControlGroup' },

    ];

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table', 'table-striped', 'table-bordered', 'table-hover']
    };

    employeeBeakInService: Array<any> = [];
    errorMessage: string;
    constructor(private _employeeBreakInServiceReportService: EmployeeBreakInServiceReportService) { }

    ngOnInit(): void {

        this._employeeBreakInServiceReportService.getReportData().subscribe(data => {
            this.Years = data.WorkYear;
            this.ControlGroups = data.ControlGroup;
            this.selectedWeekStarting = data.WeekStarting;
            this.selectedWeekEnding = data.WeekEnding;
        },
            error => this.errorMessage = <any>error);
        if (this.selectedWeekStarting === '') {
            this.selectedWeekStarting = '2016-12-30';
        }
        if (this.selectedWeekEnding === '') {
            this.selectedWeekEnding = '2017-12-30';
        }
        this.selectedYear = '-1';
        this.selectedControlGroup = '-1';
    }
    getFilterValues(): any {
        let year = this.selectedYear;
        if (year === '-1') {
            year = "''";
        }

        let cg = this.selectedControlGroup;
        if (cg === 'All' || cg === '-1') {
            cg = "''";
        }
        let ws = this.selectedWeekStarting;
        if (ws === '' || ws === undefined) {
            ws = "''";
        }
        let we = this.selectedWeekEnding;
        if (we === '' || we === undefined) {
            we = "''";
        }
        let filterCriteria: any = {
            selectedYear: year,
            selectedControlGroup: cg,
            selectedWeekStart: ws,
            selectedWeekEnding: we
        };

        return filterCriteria;
    }
    Search(): void {
        // this.onChangeTable(this.config);
        this.dataLoaded = false;

        this.employeeBreakInServiceReports();
    }

    employeeBreakInServiceReports(): void {
        let filterCriteria = this.getFilterValues();

        this._employeeBreakInServiceReportService.getEmployeeBreakInServiceReports(filterCriteria).subscribe(empbreakinservice => {
            this.employeeBeakInService = empbreakinservice;
            this.onChangeTable(this.config);
            this.dataLoaded = true;
        },
            error => this.errorMessage = <any>error);

    }
    downloadPdf(): void {

    }

    downloadExcel(): void {
        let filterCriteria = this.getFilterValues();
        this._employeeBreakInServiceReportService.downloadExcelReport(filterCriteria);
    }

    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        // simple sorting
        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }

        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.employeeBeakInService, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }

    public changeFilter(data: any, config: any): any {
        let filteredData: Array<any> = data;
        this.columns.forEach((column: any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item: any) => {
                    return item[column.name].match(column.filtering.filterString);
                });
            }
        });

        if (!config.filtering) {
            return filteredData;
        }

        if (config.filtering.columnName) {
            return filteredData.filter((item: any) =>
                item[config.filtering.columnName].match(this.config.filtering.filterString));
        }

        let tempArray: Array<any> = [];
        filteredData.forEach((item: any) => {
            let flag = false;
            this.columns.forEach((column: any) => {
                if (item[column.name].toString().match(this.config.filtering.filterString)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;

        return filteredData;
    }

    public changePage(page: any, data: Array<any> = this.employeeBeakInService): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

}
