import { Component, OnInit } from '@angular/core';
import { ENFTReportService } from './enftreport.service';


@Component({
    moduleId: module.id,
    templateUrl: 'enftreport.html'

})
export class ENFTReportComponent implements OnInit {

    dataLoaded: boolean;
    selectedYear: string;
    selectedHireMonth: string;
    selectedControlGroup: string;
    selectedTypeOfHours: string;
    selectedNonFullTimeCatgeories: Array<string>;
    AvgWeeklyHrsThr: string;
    selectedweekCount: number;

    Years: Array<string>;
    Months: Array<string>;
    ControlGroups: Array<string>;
    TypeOfHours: Array<string>;
    NonFullTimeCatgeories: Array<string>;
    errorMessage: string;
    count13Weeks: string;
    count26Weeks: string;
    count47Weeks: string;
    count52Weeks: string;

    workDetails: Array<any> = [];

    public rows: Array<any> = [];
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
        { title: 'Total Hours', className: 'va-m', name: 'totalHours' }
    ];
    public page: number = 1;
    public itemsPerPage: number = 50;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table', 'table-striped', 'table-bordered', 'table-hover']
    };

    constructor(private _enftreport: ENFTReportService) {

    }

    ngOnInit(): void {
        // throw new Error('Method not implemented.');

        this._enftreport.getReportData().subscribe(data => {

            this.Years = data.WorkYear;
            this.Months = data.WorkMonth;
            this.ControlGroups = data.ControlGroup;
            this.TypeOfHours = data.UnionType;
            this.NonFullTimeCatgeories = data.EmployeeType;
        },
            error => this.errorMessage = <any>error);

        this.AvgWeeklyHrsThr = '30';

        this.selectedYear = '-1';
        this.selectedHireMonth = '-1';
        this.selectedControlGroup = '-1';
        this.selectedTypeOfHours = '-1';

        this.count13Weeks = '0';
        this.count26Weeks = '0';
        this.count47Weeks = '0';
        this.count52Weeks = '0';

        this.onChangeTable(this.config);
        this.dataLoaded = false;
        this.selectedweekCount = 13;
    }
    getFilterValues(): any {
        let year = this.selectedYear;
        if (year === '-1') {
            year = "''";
        }
        let month = this.selectedHireMonth;
        if (month === '-1') {
            month = "''";
        }
        let cg = this.selectedControlGroup;
        if (cg === 'All' || cg === '-1') {
            cg = "''";;
        }
        let emptype = this.selectedTypeOfHours;
        if (emptype === '-1') {
            emptype = "''";;
        }
        let cat = this.selectedNonFullTimeCatgeories;
        if (cat === undefined || cat.length === 0) {
            cat = ["''"];
        }
        let filterCriteria: any = {
            selectedYear: year, selectedHireMonth: month, selectedControlGroup: cg,
            selectedTypeOfHours: emptype, selectedNonFullTimeCatgeories: cat,
            avgWeeklyThreshold: this.AvgWeeklyHrsThr,
            reportCount: 13
        };

        return filterCriteria;
    }
    Search(): void {
        this.dataLoaded = false;
        let filterCriteria = this.getFilterValues();
        this.count13Weeks = '0';
        this.count26Weeks = '0';
        this.count47Weeks = '0';
        this.count52Weeks = '0';
        this._enftreport.getWeeklyCounts(filterCriteria)
            .subscribe(counts => {
                if (counts === undefined || counts == null || (counts != null && counts.reportCountByWeek == null)) {
                    return;
                }
                counts.reportCountByWeek.forEach((element: any) => {
                    switch (element.WEEKS_WORKED) {
                        case '13':
                            this.count13Weeks = element.WEEKS_WORKED_COUNT;
                            break;
                        case '26':
                            this.count26Weeks = element.WEEKS_WORKED_COUNT;
                            break;
                        case '47':
                            this.count47Weeks = element.WEEKS_WORKED_COUNT;
                            break;
                        case '52':
                            this.count52Weeks = element.WEEKS_WORKED_COUNT;
                            break;
                    }
                });

            },
            (error: any) => this.errorMessage = <any>error);

    }

    getWeekData(weekCount: number): void {

        this.selectedweekCount = weekCount;

        let filterCriteria = this.getFilterValues();
        filterCriteria.reportCount = this.selectedweekCount;

        this._enftreport.getWeekReportData(filterCriteria).subscribe(workdetails => {
            this.workDetails = workdetails;
            this.onChangeTable(this.config);
            this.dataLoaded = true;
        },
            error => this.errorMessage = <any>error);
        // this._enftreport.getWeekReportData(weekCount);

    }

    downloadPdf(): void {

    }

    downloadExcel(): void {
        let filterCriteria = this.getFilterValues();
        filterCriteria.reportCount = this.selectedweekCount;
        this._enftreport.downloadExcelReport(filterCriteria);
    }
    public onCellClick(data: any): any {
        console.log(data);
    }

    public changePage(page: any, data: Array<any> = this.workDetails): Array<any> {
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

        let filteredData = this.changeFilter(this.workDetails, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }
}
