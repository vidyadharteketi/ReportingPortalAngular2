import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PayrollDataActivityReportService } from './payrollDataActivityReport.service';


@Component({
    moduleId: module.id,
    templateUrl: './payrollDataActivityReport.html'

})
export class PayrollDataActivityReportComponent implements OnInit {

    pdaReportForm: FormGroup;
    private controlGroupControl: FormControl;
    private yearControl: FormControl;
    selectedYear: string;
    dataLoaded: boolean;
    ControlGroups: Array<string>;
    Years: Array<string>;
    errorMessage: string;
    count13Weeks: string;
    count26Weeks: string;
    count47Weeks: string;
    count52Weeks: string;

    workDetails: Array<any> = [];

    public rows: Array<any> = [];
    public columns: Array<any> = [
        { title: 'SSN', className: 'hidden-xs va-m', name: 'ssnNumber' },
        { title: 'First Name', className: 'hidden-xs va-m', name: 'firstName' },
        { title: 'Last Name', className: 'hidden-xs va-m', name: 'lastName' },
        { title: 'EIN', className: 'va-m', name: 'ein' },
        { title: 'Production Company', className: 'va-m', name: 'productionCompany' },
        { title: 'Hire Date', className: 'va-m', name: 'hireDate' },
        { title: 'Last Worked Date', className: 'va-m', name: 'lastDateWorked' },
        { title: 'Project', className: 'va-m', name: 'project' },
        { title: 'ClientID', className: 'va-m', name: 'clientId' },
        { title: 'Source', className: 'va-m', name: 'source' },
        { title: 'Employment Status', className: 'va-m', name: 'employmentStatus' },
        { title: 'Union Hours', className: 'va-m', name: 'unionHours' },
        { title: 'Jan', className: 'va-m', name: 'jan' },
        { title: 'Feb', className: 'va-m', name: 'feb' },
        { title: 'Mar', className: 'va-m', name: 'mar' },
        { title: 'Apr', className: 'va-m', name: 'apr' },
        { title: 'May', className: 'va-m', name: 'may' },
        { title: 'Jun', className: 'va-m', name: 'jun' },
        { title: 'Jul', className: 'va-m', name: 'jul' },
        { title: 'Aug', className: 'va-m', name: 'aug' },
        { title: 'Sep', className: 'va-m', name: 'sep' },
        { title: 'Oct', className: 'va-m', name: 'oct' },
        { title: 'Nov', className: 'va-m', name: 'nov' },
        { title: 'Dec', className: 'va-m', name: 'dec' }
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

    constructor(private _pdareportsrv: PayrollDataActivityReportService) {

    }

    ngOnInit(): void {
        this.controlGroupControl = new FormControl('', Validators.required);
        this.yearControl = new FormControl('-1');
        this.pdaReportForm = new FormGroup(
            {
                controlGroup: this.controlGroupControl,
                yearControl: this.yearControl
            }
        );
        this._pdareportsrv.getReportData().subscribe(data => {
            this.ControlGroups = data.ControlGroups;
            this.Years = data.WorkYears;
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

        let cg = this.controlGroupControl.value;
        if (cg === undefined || cg === "All" || cg === "") {
            cg = "''";;
        }
        let year = this.yearControl.value;
        if (year === undefined || year === '' || year === '-1') {
            year = "''";;
        }
        let filterCriteria: any = {
            selectedYear: year,
            selectedControlGroup: cg
        };

        return filterCriteria;
    }

    Search(formValues: any): void {
        this.dataLoaded = false;
        let filterCriteria = this.getFilterValues();
        this._pdareportsrv.getPayrollDataActivityReportData(filterCriteria).subscribe(workdetails => {
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
        this._pdareportsrv.downloadExcelReport(filterCriteria);
    }
    // Validations

    validateControlGroups(): boolean {
        return this.controlGroupControl.valid || this.controlGroupControl.untouched;
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
