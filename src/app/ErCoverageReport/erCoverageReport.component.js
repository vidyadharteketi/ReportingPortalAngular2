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
var erCoverageReport_service_1 = require("./erCoverageReport.service");
var ErCoverageReportComponent = (function () {
    function ErCoverageReportComponent(_erCoverageReportService) {
        this._erCoverageReportService = _erCoverageReportService;
        this.annulaizedMonthly = '0';
        this.workerDetails = [];
        this.rows = [];
        this.page = 1;
        this.itemsPerPage = 50;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.columns = [
            { title: 'Control Group', className: 'va-m', name: 'controlGroup' },
            { title: 'Year', className: 'va-m', name: 'workYear' },
            { title: 'Month', className: 'va-m', name: 'workMonth' },
            { title: 'Worker pool FTE Status', className: 'va-m', name: 'workerPoolFteStatus' },
            { title: 'First Name', className: 'hidden-xs va-m', name: 'firstName' },
            { title: 'Last Name', className: 'va-m', name: 'lastName' },
            { title: 'Worked Hours', className: 'va-m', name: 'workedHours' },
            { title: 'Worker Pool FTE Count', className: 'va-m', name: 'workerPoolFteCount' },
        ];
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table', 'table-striped', 'table-bordered', 'table-hover']
        };
    }
    ErCoverageReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._erCoverageReportService.getReportData().subscribe(function (data) {
            _this.Years = data.WorkYears;
            _this.ControlGroups = data.ControlGroups;
        }, function (error) { return _this.errorMessage = error; });
        this.selectedYear = '-1';
        this.selectedHireMonth = '-1';
        this.selectedControlGroup = '-1';
        this.annulaizedMonthly = '0';
        this.onChangeTable(this.config);
        this.dataLoaded = false;
    };
    ErCoverageReportComponent.prototype.annualizedMonthlyReportData = function () {
        var _this = this;
        this.dataLoaded = false;
        var filterCriteria = this.getFilterValues();
        filterCriteria.annulaizedMonthly = this.annulaizedMonthly;
        this._erCoverageReportService.getAnnulaizedMonthlyWorkersReportData(filterCriteria).subscribe(function (workdetails) {
            _this.workerDetails = workdetails;
            _this.onChangeTable(_this.config);
            _this.dataLoaded = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    ErCoverageReportComponent.prototype.getFilterValues = function () {
        var year = this.selectedYear;
        if (year === '-1') {
            year = "''";
        }
        var cg = this.selectedControlGroup;
        if (cg === 'All' || cg === '-1') {
            cg = "''";
        }
        var filterCriteria = {
            selectedYear: year, selectedControlGroup: cg
        };
        return filterCriteria;
    };
    ErCoverageReportComponent.prototype.Search = function () {
        var _this = this;
        var filterCriteria = this.getFilterValues();
        this.annulaizedMonthly = '0';
        this._erCoverageReportService.getAnnulaizedMonthlyWorkers(filterCriteria)
            .subscribe(function (counts) {
            if (counts === undefined || counts == null) {
                return;
            }
            counts.forEach(function (element) {
                _this.annulaizedMonthly = element.ANNUALIZED_MONTHLY_COUNT;
            });
        }, function (error) { return _this.errorMessage = error; });
    };
    ErCoverageReportComponent.prototype.downloadPdf = function () {
    };
    ErCoverageReportComponent.prototype.downloadExcel = function () {
        var filterCriteria = this.getFilterValues();
        this._erCoverageReportService.downloadExcelReport(filterCriteria);
    };
    ErCoverageReportComponent.prototype.onCellClick = function (data) {
        console.log(data);
    };
    ErCoverageReportComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.workerDetails; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    ErCoverageReportComponent.prototype.changeFilter = function (data, config) {
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
    ErCoverageReportComponent.prototype.changeSort = function (data, config) {
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
    ErCoverageReportComponent.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.workerDetails, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    };
    return ErCoverageReportComponent;
}());
ErCoverageReportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'erCoverageReport.html'
    }),
    __metadata("design:paramtypes", [erCoverageReport_service_1.ErCoverageReportService])
], ErCoverageReportComponent);
exports.ErCoverageReportComponent = ErCoverageReportComponent;
//# sourceMappingURL=erCoverageReport.component.js.map