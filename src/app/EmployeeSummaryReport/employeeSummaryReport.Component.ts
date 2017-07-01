import { Component, OnInit } from '@angular/core';
import { EmployeeSummaryReportService } from './employeeSummaryReport.service';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { ExportToExcelService } from '../shared/export.service';

@Component({
    moduleId: module.id,
    templateUrl: 'employeeSummaryReport.html',
})

export class EmployeeSummaryReportComponent implements OnInit {
    reportRunDate: string;
    planStartDate: string;
    measurmentPeriod: string;
    newHireMeasurmentPeriod: string;
    adminstrativePeriod: string;
    companyName: string;
    empDetails: Array<any> = [];
    public rows: Array<any> = [];
    dataLoaded: boolean;
    errorMessage: string;


    public columns: Array<any> = [

        { title: 'Employee Name', className: 'va-m', name: 'employeeName' },
        { title: 'Union Status', className: 'va-m', name: 'unionStatus' },
        { title: 'SSN', className: 'va-m', name: 'ssnNumber' },
        { title: 'Most Recent Show', className: 'va-m', name: 'mostRecentShow' },
        { title: 'Most Recent Job Title', className: 'va-m', name: 'mostRecentJobTitle' },
        { title: 'ACA Empl Basis', className: 'va-m', name: 'acaEmployeeBasis' },
        { title: 'ACA Start Date', className: 'va-m', name: 'acaStartDate' },
        { title: 'Last Paid Week Ending', className: 'va-m', name: 'lastPaidWeekEnding' },
        { title: 'Full Time Benefits Effective', className: 'va-m', name: 'fullTimeBenefitsEffective' },
        { title: 'Applicable Periods', className: 'va-m', name: 'applicablePeriods' },
        { title: 'Standard Meas Period', className: 'va-m', name: 'standardMeasurementPeriod' },
        { title: 'Avg Weekly Hours', className: 'va-m', name: 'standardAverageWeeklyHours' },
        { title: 'Total Hours', className: 'va-m', name: 'standardTotalHours' },
        { title: 'Standard Measured Eligibility', className: 'va-m', name: 'standardMeasuredEligibility' },
        { title: 'Standard Benefits Effective', className: 'va-m', name: 'standardBenefitsEffective' },
        { title: 'Standard Stability Period', className: 'va-m', name: 'standardStabilityPeriod' },
        { title: 'Intial Meas Period', className: 'va-m', name: 'initialMeasurementPeriod' },
        { title: 'Avg Weekly Hours', className: 'va-m', name: 'initialAverageWeeklyHours' },
        { title: 'Total Hours', className: 'va-m', name: 'initialTotalHours' },
        { title: 'Intially Measure Eligibility', className: 'va-m', name: 'initialMeasureEligibility' },
        { title: 'Intially Benefits Effective', className: 'va-m', name: 'initialBenefitsEffective' },
        { title: 'Intially Stability Period', className: 'va-m', name: 'initialStabilityPeriod' }

    ];
    public page: number = 1;
    public itemsPerPage: number = 4;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table', 'table-striped', 'table-bordered', 'table-hover']
    };

    constructor(private _employeeSummaryReportService: EmployeeSummaryReportService, private _export: ExportToExcelService) { }

    ngOnInit(): void {
        this.reportRunDate = '2/3/2015 12:00:00 AM';
        this.planStartDate = '1/1/2016 12:00:00 AM';
        this.measurmentPeriod = '11 Months';
        this.newHireMeasurmentPeriod = '';
        this.adminstrativePeriod = '30 days';
        this.companyName = ' BIG FISH ENTERTAINMENT LLC';
        this.employeeEligibleReportsData();

    }

    employeeEligibleReportsData(): void {
        this._employeeSummaryReportService.getEmployeeSummaryReports().subscribe(empdetails => {
            this.empDetails = empdetails;
            this.onChangeTable(this.config);
            this.dataLoaded = true;
        },
            error => this.errorMessage = <any>error);

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

        let filteredData = this.changeFilter(this.empDetails, this.config);
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

    public changePage(page: any, data: Array<any> = this.empDetails): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

}
