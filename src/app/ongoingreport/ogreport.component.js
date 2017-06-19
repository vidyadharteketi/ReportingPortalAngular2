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
var ogreport_service_1 = require("./ogreport.service");
var export_service_1 = require("../shared/export.service");
var OnGoingReportComponent = (function () {
    function OnGoingReportComponent(_ogreportsrv, _export) {
        this._ogreportsrv = _ogreportsrv;
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
            { title: 'Union/Non-Union', className: 'va-m', name: 'unionType' },
            { title: 'Weeks Since Last Worked', className: 'va-m', name: 'weeksSinceLastWorked' },
            { title: 'Average Hours-SMP', className: 'va-m', name: 'avgHours' },
            { title: 'Total Hours', className: 'va-m', name: 'totalHours' },
            { title: 'Employee Type', className: 'va-m', name: 'employeeType' }
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
    OnGoingReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.controlGroupControl = new forms_1.FormControl("", forms_1.Validators.required);
        this.typeOfHoursControl = new forms_1.FormControl("", forms_1.Validators.required);
        this.measurementEndDateControl = new forms_1.FormControl("", forms_1.Validators.required);
        this.avgWeeklyThresholdControl = new forms_1.FormControl("30", forms_1.Validators.required);
        this.ogReportForm = new forms_1.FormGroup({
            controlGroup: this.controlGroupControl,
            typeOfHour: this.typeOfHoursControl,
            avgWeeklyHoursThreshold: this.avgWeeklyThresholdControl,
            measurementEndDate: this.measurementEndDateControl
        });
        this._ogreportsrv.getReportData().subscribe(function (data) {
            _this.measurementEndDates = data.measurementDate;
            _this.controlGroups = data.ControlGroup;
            _this.typeOfHours = data.typeOfHours;
        }, function (error) { return _this.errorMessage = error; });
        this.count13Weeks = "0";
        this.count26Weeks = "0";
        this.count47Weeks = "0";
        this.count52Weeks = "0";
        this.onChangeTable(this.config);
        this.dataLoaded = false;
    };
    OnGoingReportComponent.prototype.getFilterValues = function () {
        var measurementDate = this.measurementEndDateControl.value;
        if (measurementDate == undefined || measurementDate == "") {
            measurementDate = "''";
        }
        var cg = this.controlGroupControl.value;
        if (cg == undefined || cg == "All" || cg == "") {
            cg = "''";
            ;
        }
        var emptype = this.typeOfHoursControl.value;
        if (emptype == undefined || emptype == "") {
            emptype = "''";
            ;
        }
        var cat = this.avgWeeklyThresholdControl.value;
        if (cat == undefined || cat == "") {
            cat = "''";
        }
        var filterCriteria = {
            selectedMeasuredDate: measurementDate,
            selectedControlGroup: cg,
            selectedTypeOfHours: emptype,
            avgWeeklyThreshold: cat,
            reportCount: 13
        };
        return filterCriteria;
    };
    OnGoingReportComponent.prototype.Search = function (formValues) {
        var _this = this;
        this.dataLoaded = false;
        var filterCriteria = this.getFilterValues();
        this.count13Weeks = "0";
        this.count26Weeks = "0";
        this.count47Weeks = "0";
        this.count52Weeks = "0";
        var counts = this._ogreportsrv.getOnGoingReportDataCount(filterCriteria).subscribe(function (counts) {
            debugger;
            if (counts == undefined || counts == null || (counts != null && counts.onGoingCountByWeeks == null)) {
                return;
            }
            counts.onGoingCountByWeeks.forEach(function (element) {
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
    OnGoingReportComponent.prototype.getWeekData = function (weekCount) {
        var _this = this;
        var filterCriteria = this.getFilterValues();
        filterCriteria.reportCount = weekCount;
        this._ogreportsrv.getOnGoingReportData(filterCriteria).subscribe(function (workdetails) {
            debugger;
            _this.workDetails = workdetails;
            _this.onChangeTable(_this.config);
            _this.dataLoaded = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    OnGoingReportComponent.prototype.downloadPdf = function () {
    };
    OnGoingReportComponent.prototype.downloadExcel = function () {
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
    OnGoingReportComponent.prototype.validateControlGroups = function () {
        return this.controlGroupControl.valid || this.controlGroupControl.untouched;
    };
    OnGoingReportComponent.prototype.validateMeasurementEndDate = function () {
        return this.measurementEndDateControl.valid || this.measurementEndDateControl.untouched;
    };
    OnGoingReportComponent.prototype.validateAvgThreashold = function () {
        return this.avgWeeklyThresholdControl.valid || this.avgWeeklyThresholdControl.untouched;
    };
    OnGoingReportComponent.prototype.validateTypeOfHour = function () {
        return this.typeOfHoursControl.valid || this.typeOfHoursControl.untouched;
    };
    OnGoingReportComponent.prototype.onCellClick = function (data) {
        console.log(data);
    };
    OnGoingReportComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.workDetails; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    OnGoingReportComponent.prototype.changeFilter = function (data, config) {
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
    OnGoingReportComponent.prototype.changeSort = function (data, config) {
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
    OnGoingReportComponent.prototype.onChangeTable = function (config, page) {
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
    return OnGoingReportComponent;
}());
OnGoingReportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './ogreport.html'
    }),
    __metadata("design:paramtypes", [ogreport_service_1.OnGoingReportService, export_service_1.ExportToExcelService])
], OnGoingReportComponent);
exports.OnGoingReportComponent = OnGoingReportComponent;
//# sourceMappingURL=ogreport.component.js.map