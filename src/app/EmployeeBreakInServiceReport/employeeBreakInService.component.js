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
var employeeBreakInServiceReport_service_1 = require("./employeeBreakInServiceReport.service");
var EmployeeBreakInServiceReportComponent = (function () {
    function EmployeeBreakInServiceReportComponent(_employeeBreakInServiceReportService) {
        this._employeeBreakInServiceReportService = _employeeBreakInServiceReportService;
        this.rows = [];
        this.page = 1;
        this.itemsPerPage = 5;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.columns = [
            { title: 'Control Group', className: 'va-m', name: 'ControlGroup' },
            { title: 'Work Year', className: 'va-m', name: 'WorkYear' },
            { title: 'Employee Name', className: 'va-m', name: 'FirstName' },
            { title: 'SSN', className: 'va-m', name: 'SSN' },
            { title: 'Service Status', className: 'va-m', name: 'ServiceStatus' },
            { title: 'Week Starting', className: 'va-m', name: 'WeekStarting' },
            { title: 'Week Ending', className: 'va-m', name: 'WeekEnding' },
            { title: 'Week Count', className: 'va-m', name: 'WeekCount' }
        ];
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table', 'table-striped', 'table-bordered', 'table-hover']
        };
        this.employeeBeakInService = [];
    }
    EmployeeBreakInServiceReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._employeeBreakInServiceReportService.getReportData().subscribe(function (data) {
            _this.Years = data.WorkYear;
            _this.ControlGroups = data.ControlGroup;
            _this.selectedWeekStarting = data.WeekStarting;
            _this.selectedWeekEnding = data.WeekEnding;
        }, function (error) { return _this.errorMessage = error; });
        if (this.selectedWeekStarting === '') {
            this.selectedWeekStarting = '2016-12-30';
        }
        if (this.selectedWeekEnding === '') {
            this.selectedWeekEnding = '2017-12-30';
        }
        this.selectedYear = '-1';
        this.selectedControlGroup = '-1';
    };
    EmployeeBreakInServiceReportComponent.prototype.getFilterValues = function () {
        var year = this.selectedYear;
        if (year === '-1') {
            year = "''";
        }
        var cg = this.selectedControlGroup;
        if (cg === 'All' || cg === '-1') {
            cg = "''";
        }
        var ws = this.selectedWeekStarting;
        if (ws === '' || ws === undefined) {
            ws = "''";
        }
        var we = this.selectedWeekEnding;
        if (we === '' || we === undefined) {
            we = "''";
        }
        var filterCriteria = {
            selectedYear: year,
            selectedControlGroup: cg,
            selectedWeekStart: ws,
            selectedWeekEnding: we
        };
        return filterCriteria;
    };
    EmployeeBreakInServiceReportComponent.prototype.Search = function () {
        // this.onChangeTable(this.config);
        this.dataLoaded = false;
        this.employeeBreakInServiceReports();
    };
    EmployeeBreakInServiceReportComponent.prototype.employeeBreakInServiceReports = function () {
        var _this = this;
        var filterCriteria = this.getFilterValues();
        this._employeeBreakInServiceReportService.getEmployeeBreakInServiceReports(filterCriteria).subscribe(function (empbreakinservice) {
            _this.employeeBeakInService = empbreakinservice;
            _this.onChangeTable(_this.config);
            _this.dataLoaded = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    EmployeeBreakInServiceReportComponent.prototype.downloadPdf = function () {
    };
    EmployeeBreakInServiceReportComponent.prototype.downloadExcel = function () {
        var filterCriteria = this.getFilterValues();
        this._employeeBreakInServiceReportService.downloadExcelReport(filterCriteria);
    };
    EmployeeBreakInServiceReportComponent.prototype.changeSort = function (data, config) {
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
    EmployeeBreakInServiceReportComponent.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.employeeBeakInService, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    };
    EmployeeBreakInServiceReportComponent.prototype.changeFilter = function (data, config) {
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
    EmployeeBreakInServiceReportComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.employeeBeakInService; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    return EmployeeBreakInServiceReportComponent;
}());
EmployeeBreakInServiceReportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'employeeBreakInServiceReport.html'
    }),
    __metadata("design:paramtypes", [employeeBreakInServiceReport_service_1.EmployeeBreakInServiceReportService])
], EmployeeBreakInServiceReportComponent);
exports.EmployeeBreakInServiceReportComponent = EmployeeBreakInServiceReportComponent;
//# sourceMappingURL=employeeBreakInService.component.js.map