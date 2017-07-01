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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var app_config_1 = require("../app.config");
var ENFTReportService = (function () {
    function ENFTReportService(_http) {
        this._http = _http;
        this._enftreportUrl = app_config_1.CONFIGURATION.baseServiceUrl + 'newhiresnonfulltimereportservice/';
    }
    ENFTReportService.prototype.getReportData = function () {
        return this._http.get(this._enftreportUrl + 'getNewHiresNonFullTimeReportReferenceData')
            .map(function (response) { return response.json().EligibilityNewHiresNonFullTimeReferenceData; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ENFTReportService.prototype.getYears = function () { return this.data.WorkYear; };
    ENFTReportService.prototype.getMonths = function () { return this.data.WorkMonth; };
    ENFTReportService.prototype.getControlGroups = function () { return this.data.ControlGroup; };
    ENFTReportService.prototype.getTypeOfHours = function () { return this.data.UnionType; };
    ENFTReportService.prototype.getNonFullTimeCategories = function () { return this.data.EmployeeType; };
    ENFTReportService.prototype.getWeeklyCounts = function (filterCriteria) {
        var fileName = 'getNewHiresNonFullTimeCountByWeek?WorkYear=' + filterCriteria.selectedYear
            + '&WorkMonth=' + filterCriteria.selectedHireMonth
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '&UnionType=' + filterCriteria.selectedTypeOfHours
            + '&EmployeeType=' + filterCriteria.selectedNonFullTimeCatgeories + '';
        return this._http.get(this._enftreportUrl + fileName)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
        // return { count13Weeks: "3", count26Weeks: "4", count47Weeks: "5", count52Weeks: "6" };
    };
    ENFTReportService.prototype.getWeekReportData = function (filterCriteria) {
        var fileName = 'getNewHiresNonFullTimeReportData?WorkYear=' + filterCriteria.selectedYear
            + '&WorkMonth=' + filterCriteria.selectedHireMonth
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '&UnionType=' + filterCriteria.selectedTypeOfHours
            + '&EmployeeType=' + filterCriteria.selectedNonFullTimeCatgeories + '&ReportOfWeek=' + filterCriteria.reportCount;
        return this._http.get(this._enftreportUrl + fileName)
            .map(function (response) { return response.json().reportByWeekCount; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    ENFTReportService.prototype.downloadExcelReport = function (filterCriteria) {
        var fileName = 'processnewhiresnonfulltimeexcelzipdownload?WorkYear=' + filterCriteria.selectedYear
            + '&WorkMonth=' + filterCriteria.selectedHireMonth
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '&UnionType=' + filterCriteria.selectedTypeOfHours
            + '&EmployeeType=' + filterCriteria.selectedNonFullTimeCatgeories + '&ReportOfWeek=' + filterCriteria.reportCount;
        window.open(this._enftreportUrl + fileName, '_bank');
    };
    ENFTReportService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return ENFTReportService;
}());
ENFTReportService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ENFTReportService);
exports.ENFTReportService = ENFTReportService;
//# sourceMappingURL=enftreport.service.js.map