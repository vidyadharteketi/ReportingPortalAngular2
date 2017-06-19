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
var nhftreport_service_1 = require("./nhftreport.service");
var export_service_1 = require("../shared/export.service");
var NewHireFullTimeComponent = (function () {
    function NewHireFullTimeComponent(_newHireFullTimeService, _export) {
        this._newHireFullTimeService = _newHireFullTimeService;
        this._export = _export;
        this.eligibleFullTimeWorkers = "0";
        this.workerDetails = [];
        this.rows = [];
        this.page = 1;
        this.itemsPerPage = 50;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.columns = [
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
            { title: 'Total Hours', className: 'va-m', name: 'totalHours' },
        ];
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table', 'table-striped', 'table-bordered', 'table-hover']
        };
    }
    NewHireFullTimeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._newHireFullTimeService.getReportData().subscribe(function (data) {
            _this.Years = data.WorkYear;
            _this.Months = data.WorkMonth;
            _this.ControlGroups = data.ControlGroup;
        }, function (error) { return _this.errorMessage = error; });
        this.selectedYear = "-1";
        this.selectedHireMonth = "-1";
        this.selectedControlGroup = "-1";
        this.eligibleFullTimeWorkers = "0";
        this.onChangeTable(this.config);
        this.dataLoaded = false;
    };
    NewHireFullTimeComponent.prototype.eligibleFullTimeReportData = function () {
        var _this = this;
        var filterCriteria = this.getFilterValues();
        filterCriteria.acaEligibleCount = this.eligibleFullTimeWorkers;
        this._newHireFullTimeService.getEligibleFullTimeReportData(filterCriteria).subscribe(function (workdetails) {
            _this.workerDetails = workdetails;
            _this.onChangeTable(_this.config);
            _this.dataLoaded = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    NewHireFullTimeComponent.prototype.getFilterValues = function () {
        var year = this.selectedYear;
        if (year == "-1") {
            year = "''";
        }
        var month = this.selectedHireMonth;
        if (month == "-1") {
            month = "''";
            ;
        }
        var cg = this.selectedControlGroup;
        if (cg == "All" || cg == "-1") {
            cg = "''";
            ;
        }
        var filterCriteria = {
            selectedYear: year, selectedHireMonth: month, selectedControlGroup: cg
        };
        return filterCriteria;
    };
    NewHireFullTimeComponent.prototype.Search = function () {
        var _this = this;
        this.dataLoaded = false;
        var filterCriteria = this.getFilterValues();
        this.eligibleFullTimeWorkers = "0";
        var counts = this._newHireFullTimeService.getEligibleFullTimeWorkers(filterCriteria)
            .subscribe(function (counts) {
            debugger;
            if (counts == undefined || counts == null) {
                return;
            }
            counts.forEach(function (element) {
                _this.eligibleFullTimeWorkers = element.acaEligibleCount;
            });
        }, function (error) { return _this.errorMessage = error; });
    };
    NewHireFullTimeComponent.prototype.downloadPdf = function () {
    };
    NewHireFullTimeComponent.prototype.downloadExcel = function () {
        debugger;
        var tbl = document.getElementById('datatable');
        var btn = document.getElementById('btnDownloadExcel');
        if (tbl) {
            console.log(tbl.children[0]);
        }
        if (tbl && tbl.children.length > 0)
            this._export.excelByTableElement(btn, tbl.children[0], 'New Hire Full Time Report');
    };
    NewHireFullTimeComponent.prototype.onCellClick = function (data) {
        console.log(data);
    };
    NewHireFullTimeComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.workerDetails; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    NewHireFullTimeComponent.prototype.changeFilter = function (data, config) {
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
    NewHireFullTimeComponent.prototype.changeSort = function (data, config) {
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
    NewHireFullTimeComponent.prototype.onChangeTable = function (config, page) {
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
    return NewHireFullTimeComponent;
}());
NewHireFullTimeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'nhftreport',
        templateUrl: 'nhftreport.html'
    }),
    __metadata("design:paramtypes", [nhftreport_service_1.NewHireFullTimeService, export_service_1.ExportToExcelService])
], NewHireFullTimeComponent);
exports.NewHireFullTimeComponent = NewHireFullTimeComponent;
//# sourceMappingURL=nhftreport.component.js.map