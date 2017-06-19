import { Component, OnInit } from '@angular/core';
import { NewHireFullTimeService } from './nhftreport.service';
import { ExportToExcelService } from '../shared/export.service';
@Component({
    moduleId: module.id,
    selector: 'nhftreport',
    templateUrl: 'nhftreport.html'
})

export class NewHireFullTimeComponent implements OnInit {

    constructor(private _newHireFullTimeService: NewHireFullTimeService, private _export: ExportToExcelService) { }

    selectedYear: string;
    selectedHireMonth: string;
    selectedControlGroup: string;
    eligibleFullTimeWorkers: string = "0";
    errorMessage: string;

    Years: Array<string>;
    Months: Array<string>;
    ControlGroups: Array<string>;
    workerDetails: Array<any> = [];

    dataLoaded: boolean;
    public rows: Array<any> = [];
    public page: number = 1;
    public itemsPerPage: number = 50;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    public columns: Array<any> = [
        { title: 'Control Group', className: 'va-m', name: 'controlGroup' },
        { title: 'Latest Production Company', className: 'va-m', name: 'mostRecentProductionCompany' },
        { title: 'Most Recent Show', className: 'va-m', name: 'mostRecentProject' },
        { title: 'SSN Number', className: 'hidden-xs va-m', name: 'ssnNumber' },
        { title: 'First Name', className: 'hidden-xs va-m', name: 'firstName' },
        { title: 'Last Name', className: 'va-m', name: 'lastName' },
        { title: 'Last Worked Date', className: 'va-m', name: 'lastWorkedDate' },
        { title: 'Hire Date', className: 'va-m', name: 'hireDate' },
        { title: 'Union Type', className: 'va-m', name: 'unionType' },
        { title: 'Payroll Source', className: 'va-m', name: 'payrollSource' },
        { title: 'Average Hours', className: 'va-m', name: 'avgHours' },
        { title: 'Total Hours', className: 'va-m', name: 'totalHours' },

    ];


    ngOnInit(): void {
         this._newHireFullTimeService.getReportData().subscribe(data => {

            this.Years = data.WorkYear;
            this.Months = data.WorkMonth;
            this.ControlGroups = data.ControlGroup;
        },
            error => this.errorMessage = <any>error);

        this.selectedYear = "-1";
        this.selectedHireMonth = "-1";
        this.selectedControlGroup = "-1";
        this.eligibleFullTimeWorkers = "0"

        this.onChangeTable(this.config);
        this.dataLoaded = false;

    }

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table', 'table-striped', 'table-bordered', 'table-hover']
    };

    eligibleFullTimeReportData(): void {
        let filterCriteria = this.getFilterValues();
        filterCriteria.acaEligibleCount=this.eligibleFullTimeWorkers;
        this._newHireFullTimeService.getEligibleFullTimeReportData(filterCriteria).subscribe(workdetails => {
            this.workerDetails = workdetails;
            this.onChangeTable(this.config);
            this.dataLoaded = true;
        },
            error => this.errorMessage = <any>error);

    }


    getFilterValues(): any {
        let year = this.selectedYear;
        if (year == "-1") {
            year = "''";
        }
        let month = this.selectedHireMonth;
        if (month == "-1") {
            month = "''";;
        }
        let cg = this.selectedControlGroup;
        if (cg == "All" || cg == "-1") {
            cg = "''";;
        }

        let filterCriteria: any = {
            selectedYear: year, selectedHireMonth: month, selectedControlGroup: cg
        };

        return filterCriteria;
    }

    Search(): void {
        this.dataLoaded = false;
        let filterCriteria = this.getFilterValues();
        this.eligibleFullTimeWorkers = "0";

        let counts = this._newHireFullTimeService.getEligibleFullTimeWorkers(filterCriteria)
            .subscribe(counts => {
                debugger;
                if (counts == undefined || counts == null) {
                    return;
                }
                counts.forEach((element: any) => {
                    this.eligibleFullTimeWorkers = element.acaEligibleCount;
                });

            },
            (error: any) => this.errorMessage = <any>error);


    }


    downloadPdf(): void {

    }

    downloadExcel(): void {
        debugger;
        var tbl = document.getElementById('datatable');
        var btn = document.getElementById('btnDownloadExcel');
        if (tbl) {
            console.log(tbl.children[0]);
        }
        if (tbl && tbl.children.length > 0)
            this._export.excelByTableElement(btn, tbl.children[0], 'New Hire Full Time Report');
    }
    public onCellClick(data: any): any {
        console.log(data);
    }

    public changePage(page: any, data: Array<any> = this.workerDetails): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
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

        let filteredData = this.changeFilter(this.workerDetails, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }
}