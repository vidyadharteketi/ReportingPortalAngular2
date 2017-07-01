import { Component, OnInit } from '@angular/core';
import { EmployeeDemographicReportService } from './employeeDemographicReport.service';

@Component({
    moduleId: module.id,
    templateUrl: 'employeeDemographicReport.html'

})
export class EmployeeDemographicReportComponent implements OnInit {

    dataLoaded: boolean;

    selectedYear: string;
    selectedControlGroup: string;
    selectedParentCompany: string;
    selectedProductionCompany: string;
    selectedPayrollCompany: string;

    ParentCompanies: Array<string>;
    ProductionCompanies: Array<string>;
    PayrollCompanies: Array<string>;
    Years: Array<string>;
    ControlGroups: Array<string>;

    public rows: Array<any> = [];
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    public columns: Array<any> = [

        { title: 'Parent Company', className: 'va-m', name: 'ParentCompany' },
        { title: 'Prodcution Company', className: 'va-m', name: 'ProductionCompany' },
        { title: 'Show Name', className: 'va-m', name: 'ShowName' },
        { title: 'Pay Roll Company', className: 'va-m', name: 'PayrollCompany' },
        { title: 'Employee Name', className: 'va-m', name: 'EmployeeName' },
        { title: 'Union Status', className: 'va-m', name: 'UnionStatus' },
        { title: 'SSN', className: 'va-m', name: 'SSN' },
        { title: 'ACA Employment Basis', className: 'va-m', name: 'ACAEmploymentBasis' },
        { title: 'Schedule Code', className: 'va-m', name: 'ScheduleCode' },
        { title: 'Pay Rate', className: 'va-m', name: 'PayRate' },
        { title: 'Job Description', className: 'va-m', name: 'JobDescription' },
        { title: 'Gender', className: 'va-m', name: 'Gender' },
        { title: 'Date of Birth', className: 'va-m', name: 'DateOfBirth' },
        { title: 'Email', className: 'va-m', name: 'Email' },
        { title: 'Address', className: 'va-m', name: 'Address' }
    ];

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table', 'table-striped', 'table-bordered', 'table-hover']
    };

    employeeDemographicDetails: Array<any> = [];
    errorMessage: string;
    constructor(private _employeeDemographicReportService: EmployeeDemographicReportService) { }

    ngOnInit(): void {

        this._employeeDemographicReportService.getReportData().subscribe(data => {
            this.Years = data.WorkYear;
            this.ControlGroups = data.ControlGroup;
            this.ParentCompanies = data.ParentCompany;
            this.ProductionCompanies = data.ProductionCompany;
            this.PayrollCompanies = data.PayrollCompany;

        },
            error => this.errorMessage = <any>error);

        this.selectedYear = '-1';
        this.selectedControlGroup = '-1';
        this.selectedParentCompany = '-1';
        this.selectedProductionCompany = '-1';
        this.selectedPayrollCompany = '-1';
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
        let parentComp = this.selectedParentCompany;
        if (parentComp === '' || parentComp === '-1' || parentComp === undefined) {
            parentComp = "''";
        }
        let prodComp = this.selectedProductionCompany;
        if (prodComp === '' || prodComp === '-1' || prodComp === undefined) {
            prodComp = "''";
        }
        let payrollComp = this.selectedPayrollCompany;
        if (payrollComp === '' || payrollComp === '-1' || payrollComp === undefined) {
            payrollComp = "''";
        }
        let filterCriteria: any = {
            selectedYear: year,
            selectedControlGroup: cg,
            selectedParentCompany: parentComp,
            selectedProductionCompany: prodComp,
            selectedPayrollCompany: payrollComp
        };

        return filterCriteria;
    }
    Search(): void {
        // this.onChangeTable(this.config);
        this.dataLoaded = false;

        this.employeeDemographicsReports();
    }

    employeeDemographicsReports(): void {
        let filterCriteria = this.getFilterValues();
        this._employeeDemographicReportService.getEmployeeDemographicsReports(filterCriteria).subscribe(empDemographics => {
            this.employeeDemographicDetails = empDemographics;
            this.onChangeTable(this.config);
            this.dataLoaded = true;
        },
            error => this.errorMessage = <any>error);

    }
    downloadPdf(): void {

    }

    downloadExcel(): void {
        let filterCriteria = this.getFilterValues();
        this._employeeDemographicReportService.downloadExcelReport(filterCriteria);
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

        let filteredData = this.changeFilter(this.employeeDemographicDetails, this.config);
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

    public changePage(page: any, data: Array<any> = this.employeeDemographicDetails): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

}
