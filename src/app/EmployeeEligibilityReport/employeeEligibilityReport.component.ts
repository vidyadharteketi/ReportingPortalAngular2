import { Component, OnInit } from '@angular/core';
import { EmployeeEligibilityReportService } from './employeeEligibilityReport.service';

@Component({
    moduleId: module.id,
    templateUrl: 'employeeEligibilityReport.html'

})
export class EmployeeEligibilityReportComponent implements OnInit {

    dataLoaded: boolean;
    selectedYear: string;
    selectedUnionStatus: string;
    selectedControlGroup: string;
    selectedTypeOfHours: string;

    Years: Array<string>;
    UnionStatus: Array<string>;
    ControlGroups: Array<string>;
    TypeOfHours: Array<string>;

    public rows: Array<any> = [];
    public page = 1;
    public itemsPerPage = 10;
    public maxSize = 5;
    public numPages = 1;
    public length = 0;

    public columns: Array<any> = [
        { title: 'Control Group', className: 'va-m', name: 'ControlGroup' },
        { title: 'Work Year', className: 'va-m', name: 'WorkYear' },
        { title: 'Employee Name', className: 'va-m', name: 'EmployeeName' },
        { title: 'Union Status', className: 'va-m', name: 'UnionStatus' },
        { title: 'SSN', className: 'va-m', name: 'SSN' },
        { title: 'Most Recent Show', className: 'va-m', name: 'MostRecentShow' },
        { title: 'Most Recent Job Title', className: 'va-m', name: 'MostRecentJobTitle' },
        { title: 'Avg Weekly Hours', className: 'va-m', name: 'AverageWeeklyHours' },
        { title: 'Total Hours', className: 'va-m', name: 'TotalHours' },
        { title: 'Standard Measured Eligibility', className: 'va-m', name: 'StandardMeasuredEligibility' },
        { title: 'Benefits Effective', className: 'va-m', name: 'BenefitsEffective' },

    ];

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table', 'table-striped', 'table-bordered', 'table-hover']
    };

    empDetails: Array<any> = [];
    errorMessage: string;
    constructor(private _employeeEligibilityReportService: EmployeeEligibilityReportService) { }

    ngOnInit(): void {

        this._employeeEligibilityReportService.getReportReferenceData().subscribe(data => {
            this.Years = data.WorkYear;
            this.ControlGroups = data.ControlGroup;
            this.UnionStatus = data.UnionStatus;
            this.TypeOfHours = data.TypeOfHours;

        },
            error => this.errorMessage = <any>error);

        this.selectedYear = '-1';
        this.selectedControlGroup = '-1';
        this.selectedUnionStatus = '-1';
        this.selectedTypeOfHours = '-1';
    }


     reset(): void {
        this.selectedYear = '-1';
        this.selectedControlGroup = '-1';
        this.dataLoaded = false;
    }

    getFilterValues(): any {
        let year = this.selectedYear;
        if (year === '-1') {
            year = "''";
        }

        let cg = this.selectedControlGroup;
        if (cg === 'All' || cg === '-1' || cg === undefined) {
            cg = "''";
        }
        let us = this.selectedUnionStatus;
        if (us === '' || us === '-1' || us === undefined) {
            us = "''";
        }
        let th = this.selectedTypeOfHours;
        if (th === '' || th === '-1' || th === undefined) {
            th = "''";
        }
        let filterCriteria: any = {
            selectedYear: year,
            selectedControlGroup: cg,
            selectedUnionStatus: us,
            selectedTypeOfHours: th
        };

        return filterCriteria;
    }

    employeeEligibleReportsData(): void {
        const filterCriteria = this.getFilterValues();
        this._employeeEligibilityReportService.getEmployeeEligibleReports(filterCriteria).subscribe(empdetails => {
            this.empDetails = empdetails;
            this.onChangeTable(this.config);
            this.dataLoaded = true;
        },
            error => this.errorMessage = <any>error);

    }

    Search(): void {

        this.dataLoaded = false;
        this.employeeEligibleReportsData();
    }

    downloadPdf(): void {

    }

    downloadExcel(): void {
        const filterCriteria = this.getFilterValues();
        this._employeeEligibilityReportService.downloadExcelReport(filterCriteria);
    }
    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }

        const columns = this.config.sorting.columns || [];
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

        const filteredData = this.changeFilter(this.empDetails, this.config);
        const sortedData = this.changeSort(filteredData, this.config);
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

        const tempArray: Array<any> = [];
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

    public changePage(page: any, data: Array<any> = this.empDetails): Array<any> {
        const start = (page.page - 1) * page.itemsPerPage;
        const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

}
