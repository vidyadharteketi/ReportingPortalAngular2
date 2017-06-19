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
var enftreport_service_1 = require("./enftreport.service");
var export_service_1 = require("../shared/export.service");
var ENFTReportComponent = (function () {
    function ENFTReportComponent(_enftreport, _export) {
        this._enftreport = _enftreport;
        this._export = _export;
        this.workDetails = [];
        this.rows = [];
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
            { title: 'Total Hours', className: 'va-m', name: 'totalHours' }
        ];
        this.page = 1;
        this.itemsPerPage = 50;
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
    ENFTReportComponent.prototype.ngOnInit = function () {
        // throw new Error("Method not implemented.");
        var _this = this;
        this._enftreport.getReportData().subscribe(function (data) {
            _this.Years = data.WorkYear;
            _this.Months = data.WorkMonth;
            _this.ControlGroups = data.ControlGroup;
            _this.TypeOfHours = data.UnionType;
            _this.NonFullTimeCatgeories = data.EmployeeType;
        }, function (error) { return _this.errorMessage = error; });
        this.AvgWeeklyHrsThr = "30";
        this.selectedYear = "-1";
        this.selectedHireMonth = "-1";
        this.selectedControlGroup = "-1";
        this.selectedTypeOfHours = "-1";
        this.count13Weeks = "0";
        this.count26Weeks = "0";
        this.count47Weeks = "0";
        this.count52Weeks = "0";
        this.onChangeTable(this.config);
        this.dataLoaded = false;
    };
    ENFTReportComponent.prototype.getFilterValues = function () {
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
        var emptype = this.selectedTypeOfHours;
        if (emptype == "-1") {
            emptype = "''";
            ;
        }
        var cat = this.selectedNonFullTimeCatgeories;
        if (cat == undefined || cat.length == 0) {
            cat = ["''"];
        }
        var filterCriteria = {
            selectedYear: year, selectedHireMonth: month, selectedControlGroup: cg,
            selectedTypeOfHours: emptype, selectedNonFullTimeCatgeories: cat,
            avgWeeklyThreshold: this.AvgWeeklyHrsThr,
            reportCount: 13
        };
        return filterCriteria;
    };
    ENFTReportComponent.prototype.Search = function () {
        var _this = this;
        this.dataLoaded = false;
        var filterCriteria = this.getFilterValues();
        this.count13Weeks = "0";
        this.count26Weeks = "0";
        this.count47Weeks = "0";
        this.count52Weeks = "0";
        var counts = this._enftreport.getWeeklyCounts(filterCriteria)
            .subscribe(function (counts) {
            if (counts == undefined || counts == null || (counts != null && counts.reportCountByWeek == null)) {
                return;
            }
            counts.reportCountByWeek.forEach(function (element) {
                switch (element.WEEKS_WORKED) {
                    case "13":
                        _this.count13Weeks = element.WEEKS_WORKED_COUNT;
                        break;
                    case "26":
                        _this.count26Weeks = element.WEEKS_WORKED_COUNT;
                        break;
                    case "47":
                        _this.count47Weeks = element.WEEKS_WORKED_COUNT;
                        break;
                    case "52":
                        _this.count52Weeks = element.WEEKS_WORKED_COUNT;
                        break;
                }
            });
        }, function (error) { return _this.errorMessage = error; });
    };
    ENFTReportComponent.prototype.getWeekData = function (weekCount) {
        var _this = this;
        debugger;
        var filterCriteria = this.getFilterValues();
        filterCriteria.reportCount = weekCount;
        this._enftreport.getWeekReportData(filterCriteria).subscribe(function (workdetails) {
            debugger;
            _this.workDetails = workdetails;
            _this.onChangeTable(_this.config);
            _this.dataLoaded = true;
        }, function (error) { return _this.errorMessage = error; });
        //this._enftreport.getWeekReportData(weekCount);
    };
    ENFTReportComponent.prototype.downloadPdf = function () {
    };
    ENFTReportComponent.prototype.downloadExcel = function () {
        debugger;
        var tbl = document.getElementById('datatable');
        var btn = document.getElementById('btnDownloadExcel');
        if (tbl) {
            console.log(tbl.children[0]);
        }
        if (tbl && tbl.children.length > 0)
            this._export.excelByTableElement(btn, tbl.children[0], 'New Hire Part Time Report');
    };
    ENFTReportComponent.prototype.onCellClick = function (data) {
        console.log(data);
    };
    ENFTReportComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.workDetails; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    ENFTReportComponent.prototype.changeFilter = function (data, config) {
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
    ENFTReportComponent.prototype.changeSort = function (data, config) {
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
    ENFTReportComponent.prototype.onChangeTable = function (config, page) {
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
    return ENFTReportComponent;
}());
ENFTReportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'enftreport.html'
    }),
    __metadata("design:paramtypes", [enftreport_service_1.ENFTReportService, export_service_1.ExportToExcelService])
], ENFTReportComponent);
exports.ENFTReportComponent = ENFTReportComponent;
//# sourceMappingURL=enftreport.component.js.map