import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnGoingReportService } from './ogreport.service';

@Component({
    moduleId: module.id,
    templateUrl: './ogreport.html'

})
export class OnGoingReportComponent implements OnInit {

    ogReportForm: FormGroup;
    private controlGroupControl: FormControl;
    private measurementEndDateControl: FormControl;
    private avgWeeklyThresholdControl: FormControl;
    private typeOfHoursControl: FormControl;
    selectedweekCount: number;
    dataLoaded: boolean;

    measurementEndDates: Array<string>;
    controlGroups: Array<string>;
    typeOfHours: Array<string>;

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
        { title: 'Union/Non-Union', className: 'va-m', name: 'unionType' },
        { title: 'Weeks Since Last Worked', className: 'va-m', name: 'weeksSinceLastWorked' },
        { title: 'Average Hours-SMP', className: 'va-m', name: 'avgHours' },
        { title: 'Total Hours', className: 'va-m', name: 'totalHours' },
        { title: 'Employee Type', className: 'va-m', name: 'employeeType' }
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

    constructor(private _ogreportsrv: OnGoingReportService) {

    }

    ngOnInit(): void {
        this.controlGroupControl = new FormControl('', Validators.required);
        this.typeOfHoursControl = new FormControl('', Validators.required);
        this.measurementEndDateControl = new FormControl('', Validators.required);
        this.avgWeeklyThresholdControl = new FormControl('30', Validators.required);
        this.selectedweekCount = 13;
        this.ogReportForm = new FormGroup(
            {
                controlGroup: this.controlGroupControl,
                typeOfHour: this.typeOfHoursControl,
                avgWeeklyHoursThreshold: this.avgWeeklyThresholdControl,
                measurementEndDate: this.measurementEndDateControl
            }
        );

        this._ogreportsrv.getReportData().subscribe(data => {

            this.measurementEndDates = data.measurementDate;
            this.controlGroups = data.ControlGroup;
            this.typeOfHours = data.typeOfHours;
        },
            error => this.errorMessage = <any>error);

        this.count13Weeks = '0';
        this.count26Weeks = '0';
        this.count47Weeks = '0';
        this.count52Weeks = '0';

        this.onChangeTable(this.config);
        this.dataLoaded = false;
    }

    getFilterValues(): any {
        let measurementDate = this.measurementEndDateControl.value;
        if (measurementDate === undefined || measurementDate === '') {
            measurementDate = "''";
        }
        let cg = this.controlGroupControl.value;
        if (cg === undefined || cg === "All" || cg === '') {
            cg = "''";;
        }
        let emptype = this.typeOfHoursControl.value;
        if (emptype === undefined || emptype === '') {
            emptype = "''";;
        }
        let cat = this.avgWeeklyThresholdControl.value;
        if (cat === undefined || cat === '') {
            cat = "''";
        }
        let filterCriteria: any = {
            selectedMeasuredDate: measurementDate,
            selectedControlGroup: cg,
            selectedTypeOfHours: emptype,
            avgWeeklyThreshold: cat,
            reportCount: this.selectedweekCount
        };

        return filterCriteria;
    }

    Search(formValues: any): void {
        this.dataLoaded = false;
        let filterCriteria = this.getFilterValues();
        this.count13Weeks = '0';
        this.count26Weeks = '0';
        this.count47Weeks = '0';
        this.count52Weeks = '0';
        this._ogreportsrv.getOnGoingReportDataCount(filterCriteria).subscribe(counts => {
            if (counts === undefined || counts == null || (counts != null && counts.onGoingCountByWeeks == null)) {
                return;
            }
            counts.onGoingCountByWeeks.forEach((element: any) => {
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
        this._ogreportsrv.getOnGoingReportData(filterCriteria).subscribe(workdetails => {
            this.workDetails = workdetails;
            this.onChangeTable(this.config);
            this.dataLoaded = true;
        },
            error => this.errorMessage = <any>error);

    }

    downloadPdf(): void {

    }

    downloadExcel(): void {
        let filterCriteria = this.getFilterValues();
        filterCriteria.reportCount = this.selectedweekCount;
        this._ogreportsrv.downloadExcelReport(filterCriteria);
    }
    // Validations

    validateControlGroups(): boolean {
        return this.controlGroupControl.valid || this.controlGroupControl.untouched;
    }

    validateMeasurementEndDate(): boolean {
        return this.measurementEndDateControl.valid || this.measurementEndDateControl.untouched;
    }

    validateAvgThreashold(): boolean {
        return this.avgWeeklyThresholdControl.valid || this.avgWeeklyThresholdControl.untouched;
    }

    validateTypeOfHour(): boolean {
        return this.typeOfHoursControl.valid || this.typeOfHoursControl.untouched;
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
