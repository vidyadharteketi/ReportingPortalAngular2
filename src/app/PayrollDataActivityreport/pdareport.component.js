"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var pdareport_service_1 = require("./pdareport.service");
var export_service_1 = require("../shared/export.service");
var PayrollDataActivityReportComponent = (function () {
    function PayrollDataActivityReportComponent(_pdareportsrv, _export) {
        this._pdareportsrv = _pdareportsrv;
        this._export = _export;
        this.workDetails = [];
        this.rows = [];
        this.columns = [
            { title: 'SSN', className: 'hidden-xs va-m', name: 'ssnNumber' },
            { title: 'Employee Name', className: 'hidden-xs va-m', name: 'employeeName' },
            { title: 'EIN', className: 'va-m', name: 'ein' },
            { title: 'Production Company', className: 'va-m', name: 'productionCompany' },
            { title: 'Hire Date', className: 'va-m', name: 'hireDate' },
            { title: 'Last Worked Date', className: 'va-m', name: 'lastWorkedDate' },
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
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table', 'table-striped', 'table-bordered', 'table-hover']
        };
    }
    PayrollDataActivityReportComponent.prototype.ngOnInit = function () {
        this.controlGroupControl = new forms_1.FormControl("", forms_1.Validators.required);
        this.yearControl = new forms_1.FormControl();
        this.pdaReportForm = new forms_1.FormGroup({
            controlGroup: this.controlGroupControl,
            yearControl: this.yearControl
        });
        this.count13Weeks = "0";
        this.count26Weeks = "0";
        this.count47Weeks = "0";
        this.count52Weeks = "0";
        this.ControlGroups = this._pdareportsrv.getControlGroups();
        this.Years = this._pdareportsrv.getYears();
        this.onChangeTable(this.config);
        this.dataLoaded = false;
    };
    PayrollDataActivityReportComponent.prototype.Search = function (formValues) {
        debugger;
        var counts = this._pdareportsrv.getWeeklyCounts();
        this.count13Weeks = counts.count13Weeks;
        this.count26Weeks = counts.count26Weeks;
        this.count47Weeks = counts.count47Weeks;
        this.count52Weeks = counts.count52Weeks;
    };
    PayrollDataActivityReportComponent.prototype.getWeekData = function (weekCount) {
        var _this = this;
        // debugger;
        this._pdareportsrv.getWeekReportData(weekCount).subscribe(function (workdetails) {
            _this.workDetails = workdetails;
            _this.onChangeTable(_this.config);
            _this.dataLoaded = true;
        }, function (error) { return _this.errorMessage = error; });
        //this._ogreportsrv.getWeekReportData(weekCount);
    };
    PayrollDataActivityReportComponent.prototype.downloadPdf = function () {
    };
    PayrollDataActivityReportComponent.prototype.downloadExcel = function () {
        debugger;
        var tbl = document.getElementById('datatable');
        var btn = document.getElementById('btnDownloadExcel');
        if (tbl) {
            console.log(tbl.children[0]);
        }
        if (tbl && tbl.children.length > 0)
            this._export.excelByTableElement(btn, tbl.children[0], 'On Going Report');
    };
    //Validations
    PayrollDataActivityReportComponent.prototype.validateControlGroups = function () {
        return this.controlGroupControl.valid || this.controlGroupControl.untouched;
    };
    PayrollDataActivityReportComponent.prototype.onCellClick = function (data) {
        console.log(data);
    };
    PayrollDataActivityReportComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.workDetails; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    PayrollDataActivityReportComponent.prototype.changeFilter = function (data, config) {
        var _this = this;
        var filteredData = data;
        this.columns.forEach(function (column) {
            if (column.filtering) {
                filteredData = filteredData.filter(function (item) {
                    return item[column.name].match(column.filtering.filterString);
                });
            }
        });
        if (!config.filtering) {
            return filteredData;
        }
        if (config.filtering.columnName) {
            return filteredData.filter(function (item) {
                return item[config.filtering.columnName].match(_this.config.filtering.filterString);
            });
        }
        var tempArray = [];
        filteredData.forEach(function (item) {
            var flag = false;
            _this.columns.forEach(function (column) {
                if (item[column.name].toString().match(_this.config.filtering.filterString)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;
        return filteredData;
    };
    PayrollDataActivityReportComponent.prototype.changeSort = function (data, config) {
        if (!config.sorting) {
            return data;
        }
        var columns = this.config.sorting.columns || [];
        var columnName = void 0;
        var sort = void 0;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        // simple sorting
        return data.sort(function (previous, current) {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            }
            else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    };
    PayrollDataActivityReportComponent.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.workDetails, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    };
    return PayrollDataActivityReportComponent;
}());
PayrollDataActivityReportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './pdareport.html'
    }),
    __metadata("design:paramtypes", [pdareport_service_1.PayrollDataActivityReportService, export_service_1.ExportToExcelService])
], PayrollDataActivityReportComponent);
exports.PayrollDataActivityReportComponent = PayrollDataActivityReportComponent;
//# sourceMappingURL=pdareport.component.js.map