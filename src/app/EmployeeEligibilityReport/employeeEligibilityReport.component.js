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
var employeeEligibilityReport_service_1 = require("./employeeEligibilityReport.service");
var EmployeeEligibilityReportComponent = (function () {
    function EmployeeEligibilityReportComponent(_employeeEligibilityReportService) {
        this._employeeEligibilityReportService = _employeeEligibilityReportService;
        this.rows = [];
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.columns = [
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
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table', 'table-striped', 'table-bordered', 'table-hover']
        };
        this.empDetails = [];
    }
    EmployeeEligibilityReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._employeeEligibilityReportService.getReportReferenceData().subscribe(function (data) {
            _this.Years = data.WorkYear;
            _this.ControlGroups = data.ControlGroup;
            _this.UnionStatus = data.UnionStatus;
            _this.TypeOfHours = data.TypeOfHours;
        }, function (error) { return _this.errorMessage = error; });
        this.selectedYear = '-1';
        this.selectedControlGroup = '-1';
        this.selectedUnionStatus = '-1';
        this.selectedTypeOfHours = '-1';
    };
    EmployeeEligibilityReportComponent.prototype.getFilterValues = function () {
        var year = this.selectedYear;
        if (year === '-1') {
            year = "''";
        }
        var cg = this.selectedControlGroup;
        if (cg === 'All' || cg === '-1' || cg === undefined) {
            cg = "''";
        }
        var us = this.selectedUnionStatus;
        if (us === '' || us === '-1' || us === undefined) {
            us = "''";
        }
        var th = this.selectedTypeOfHours;
        if (th === '' || th === '-1' || th === undefined) {
            th = "''";
        }
        var filterCriteria = {
            selectedYear: year,
            selectedControlGroup: cg,
            selectedUnionStatus: us,
            selectedTypeOfHours: th
        };
        return filterCriteria;
    };
    EmployeeEligibilityReportComponent.prototype.employeeEligibleReportsData = function () {
        var _this = this;
        var filterCriteria = this.getFilterValues();
        this._employeeEligibilityReportService.getEmployeeEligibleReports(filterCriteria).subscribe(function (empdetails) {
            _this.empDetails = empdetails;
            _this.onChangeTable(_this.config);
            _this.dataLoaded = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    EmployeeEligibilityReportComponent.prototype.Search = function () {
        this.dataLoaded = false;
        this.employeeEligibleReportsData();
    };
    EmployeeEligibilityReportComponent.prototype.downloadPdf = function () {
    };
    EmployeeEligibilityReportComponent.prototype.downloadExcel = function () {
        var filterCriteria = this.getFilterValues();
        this._employeeEligibilityReportService.downloadExcelReport(filterCriteria);
    };
    EmployeeEligibilityReportComponent.prototype.changeSort = function (data, config) {
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
    EmployeeEligibilityReportComponent.prototype.onChangeTable = function (config, page) {
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
    EmployeeEligibilityReportComponent.prototype.changeFilter = function (data, config) {
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
    EmployeeEligibilityReportComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.empDetails; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    return EmployeeEligibilityReportComponent;
}());
EmployeeEligibilityReportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'employeeEligibilityReport.html'
    }),
    __metadata("design:paramtypes", [employeeEligibilityReport_service_1.EmployeeEligibilityReportService])
], EmployeeEligibilityReportComponent);
exports.EmployeeEligibilityReportComponent = EmployeeEligibilityReportComponent;
//# sourceMappingURL=employeeEligibilityReport.component.js.map