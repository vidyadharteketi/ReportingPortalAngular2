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
var employeeSummaryReport_service_1 = require("./employeeSummaryReport.service");
var export_service_1 = require("../shared/export.service");
var EmployeeSummaryReportComponent = (function () {
    function EmployeeSummaryReportComponent(_employeeSummaryReportService, _export) {
        this._employeeSummaryReportService = _employeeSummaryReportService;
        this._export = _export;
        this.empDetails = [];
        this.rows = [];
        this.columns = [
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
        this.page = 1;
        this.itemsPerPage = 4;
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
    EmployeeSummaryReportComponent.prototype.ngOnInit = function () {
        this.reportRunDate = '2/3/2015 12:00:00 AM';
        this.planStartDate = '1/1/2016 12:00:00 AM';
        this.measurmentPeriod = '11 Months';
        this.newHireMeasurmentPeriod = '';
        this.adminstrativePeriod = '30 days';
        this.companyName = ' BIG FISH ENTERTAINMENT LLC';
        this.employeeEligibleReportsData();
    };
    EmployeeSummaryReportComponent.prototype.employeeEligibleReportsData = function () {
        var _this = this;
        this._employeeSummaryReportService.getEmployeeSummaryReports().subscribe(function (empdetails) {
            _this.empDetails = empdetails;
            _this.onChangeTable(_this.config);
            _this.dataLoaded = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    EmployeeSummaryReportComponent.prototype.changeSort = function (data, config) {
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
    EmployeeSummaryReportComponent.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.empDetails, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    };
    EmployeeSummaryReportComponent.prototype.changeFilter = function (data, config) {
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
    EmployeeSummaryReportComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.empDetails; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    return EmployeeSummaryReportComponent;
}());
EmployeeSummaryReportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'employeeSummaryReport.html',
    }),
    __metadata("design:paramtypes", [employeeSummaryReport_service_1.EmployeeSummaryReportService, export_service_1.ExportToExcelService])
], EmployeeSummaryReportComponent);
exports.EmployeeSummaryReportComponent = EmployeeSummaryReportComponent;
//# sourceMappingURL=employeeSummaryReport.component.js.map