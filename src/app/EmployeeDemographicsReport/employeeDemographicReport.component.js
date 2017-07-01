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
var employeeDemographicReport_service_1 = require("./employeeDemographicReport.service");
var EmployeeDemographicReportComponent = (function () {
    function EmployeeDemographicReportComponent(_employeeDemographicReportService) {
        this._employeeDemographicReportService = _employeeDemographicReportService;
        this.rows = [];
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.columns = [
            { title: 'Control Group', className: 'va-m', name: 'ControlGroup' },
            { title: 'Work Year', className: 'va-m', name: 'WorkYear' },
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
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table', 'table-striped', 'table-bordered', 'table-hover']
        };
        this.employeeDemographicDetails = [];
    }
    EmployeeDemographicReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._employeeDemographicReportService.getReportData().subscribe(function (data) {
            _this.Years = data.WorkYear;
            _this.ControlGroups = data.ControlGroup;
            _this.ParentCompanies = data.ParentCompany;
            _this.ProductionCompanies = data.ProductionCompany;
            _this.PayrollCompanies = data.PayrollCompany;
        }, function (error) { return _this.errorMessage = error; });
        this.selectedYear = '-1';
        this.selectedControlGroup = '-1';
        this.selectedParentCompany = '-1';
        this.selectedProductionCompany = '-1';
        this.selectedPayrollCompany = '-1';
    };
    EmployeeDemographicReportComponent.prototype.getFilterValues = function () {
        var year = this.selectedYear;
        if (year === '-1') {
            year = "''";
        }
        var cg = this.selectedControlGroup;
        if (cg === 'All' || cg === '-1' || cg === undefined) {
            cg = "''";
        }
        var parentComp = this.selectedParentCompany;
        if (parentComp === '' || parentComp === '-1' || parentComp === undefined) {
            parentComp = "''";
        }
        var prodComp = this.selectedProductionCompany;
        if (prodComp === '' || prodComp === '-1' || prodComp === undefined) {
            prodComp = "''";
        }
        var payrollComp = this.selectedPayrollCompany;
        if (payrollComp === '' || payrollComp === '-1' || payrollComp === undefined) {
            payrollComp = "''";
        }
        var filterCriteria = {
            selectedYear: year,
            selectedControlGroup: cg,
            selectedParentCompany: parentComp,
            selectedProductionCompany: prodComp,
            selectedPayrollCompany: payrollComp
        };
        return filterCriteria;
    };
    EmployeeDemographicReportComponent.prototype.Search = function () {
        // this.onChangeTable(this.config);
        this.dataLoaded = false;
        this.employeeDemographicsReports();
    };
    EmployeeDemographicReportComponent.prototype.employeeDemographicsReports = function () {
        var _this = this;
        var filterCriteria = this.getFilterValues();
        this._employeeDemographicReportService.getEmployeeDemographicsReports(filterCriteria).subscribe(function (empDemographics) {
            _this.employeeDemographicDetails = empDemographics;
            _this.onChangeTable(_this.config);
            _this.dataLoaded = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    EmployeeDemographicReportComponent.prototype.downloadPdf = function () {
    };
    EmployeeDemographicReportComponent.prototype.downloadExcel = function () {
        var filterCriteria = this.getFilterValues();
        this._employeeDemographicReportService.downloadExcelReport(filterCriteria);
    };
    EmployeeDemographicReportComponent.prototype.changeSort = function (data, config) {
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
    EmployeeDemographicReportComponent.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.employeeDemographicDetails, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    };
    EmployeeDemographicReportComponent.prototype.changeFilter = function (data, config) {
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
    EmployeeDemographicReportComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.employeeDemographicDetails; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    return EmployeeDemographicReportComponent;
}());
EmployeeDemographicReportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'employeeDemographicReport.html'
    }),
    __metadata("design:paramtypes", [employeeDemographicReport_service_1.EmployeeDemographicReportService])
], EmployeeDemographicReportComponent);
exports.EmployeeDemographicReportComponent = EmployeeDemographicReportComponent;
//# sourceMappingURL=employeeDemographicReport.component.js.map