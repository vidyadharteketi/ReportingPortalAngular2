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
var export_service_1 = require("../shared/export.service");
var EmployeeDemographicReportComponent = (function () {
    function EmployeeDemographicReportComponent(_employeeDemographicReportService, _export) {
        this._employeeDemographicReportService = _employeeDemographicReportService;
        this._export = _export;
        this.rows = [];
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.columns = [
            { title: 'Parent Company', className: 'va-m', name: 'parentCompany' },
            { title: 'Prodcution Company', className: 'va-m', name: 'productionCompany' },
            { title: 'Show Name', className: 'va-m', name: 'showName' },
            { title: 'Pay Roll Company', className: 'va-m', name: 'payRollCompany' },
            { title: 'Employee Name', className: 'va-m', name: 'employeeName' },
            { title: 'Union Status', className: 'va-m', name: 'unionStatus' },
            { title: 'SSN', className: 'va-m', name: 'ssnNumber' },
            { title: 'ACA Employment Basis', className: 'va-m', name: 'acaEmploymentBasis' },
            { title: 'Schedule Code', className: 'va-m', name: 'scheduleCode' },
            { title: 'Pay Rate', className: 'va-m', name: 'payRate' },
            { title: 'Job Description', className: 'va-m', name: 'jobDescription' },
            { title: 'Gender', className: 'va-m', name: 'gender' },
            { title: 'Date of Birth', className: 'va-m', name: 'dateOfBirth' },
            { title: 'Email', className: 'va-m', name: 'email' },
            { title: 'Address', className: 'va-m', name: 'address' }
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
        this.onChangeTable(this.config);
        this.dataLoaded = false;
        this.employeeDemographicsReports();
    };
    EmployeeDemographicReportComponent.prototype.employeeDemographicsReports = function () {
        var _this = this;
        this._employeeDemographicReportService.getEmployeeDemographicsReports().subscribe(function (empDemographics) {
            _this.employeeDemographicDetails = empDemographics;
            _this.onChangeTable(_this.config);
            _this.dataLoaded = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    EmployeeDemographicReportComponent.prototype.downloadPdf = function () {
    };
    EmployeeDemographicReportComponent.prototype.downloadExcel = function () {
        debugger;
        var tbl = document.getElementById('datatable');
        var btn = document.getElementById('btnDownloadExcel');
        if (tbl) {
            console.log(tbl.children[0]);
        }
        if (tbl && tbl.children.length > 0)
            this._export.excelByTableElement(btn, tbl.children[0], 'Employee Demographic Report');
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
    __metadata("design:paramtypes", [employeeDemographicReport_service_1.EmployeeDemographicReportService, export_service_1.ExportToExcelService])
], EmployeeDemographicReportComponent);
exports.EmployeeDemographicReportComponent = EmployeeDemographicReportComponent;
//# sourceMappingURL=employeeDemographicReport.component.js.map