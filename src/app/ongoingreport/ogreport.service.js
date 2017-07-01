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
var OnGoingReportService = (function () {
    function OnGoingReportService(_http) {
        this._http = _http;
        this._onGoingReportUrl = app_config_1.CONFIGURATION.baseServiceUrl + 'ongoingreportservice/';
    }
    OnGoingReportService.prototype.getReportData = function () {
        return this._http.get(this._onGoingReportUrl + 'getonGoingreportreferencedata')
            .map(function (response) { return response.json().ongoingReportVO; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    OnGoingReportService.prototype.getOnGoingReportDataCount = function (filterCriteria) {
        var fileName = 'getOnGoingReportCountByWeek?MeasurementEndDate=' + filterCriteria.selectedMeasuredDate
            + '&AvgWeeklyHours=' + filterCriteria.avgWeeklyThreshold
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '&UnionType=' + filterCriteria.selectedTypeOfHours;
        return this._http.get(this._onGoingReportUrl + fileName)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    OnGoingReportService.prototype.getOnGoingReportData = function (filterCriteria) {
        var fileName = 'getOnGoingReportReportData?MeasurementEndDate='
            + filterCriteria.selectedMeasuredDate
            + '&AvgWeeklyHours=' + filterCriteria.avgWeeklyThreshold
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '&UnionType=' + filterCriteria.selectedTypeOfHours
            + '&ReportOfWeek=' + filterCriteria.reportCount;
        return this._http.get(this._onGoingReportUrl + fileName)
            .map(function (response) { return response.json().onGoingReportsByWeekCount; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    OnGoingReportService.prototype.downloadExcelReport = function (filterCriteria) {
        var fileName = 'processOnGoingReportExcelUpload?MeasurementEndDate='
            + filterCriteria.selectedMeasuredDate
            + '&AvgWeeklyHours=' + filterCriteria.avgWeeklyThreshold
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '&UnionType=' + filterCriteria.selectedTypeOfHours
            + '&ReportOfWeek=' + filterCriteria.reportCount;
        window.open(this._onGoingReportUrl + fileName, '_bank');
    };
    OnGoingReportService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return OnGoingReportService;
}());
OnGoingReportService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], OnGoingReportService);
exports.OnGoingReportService = OnGoingReportService;
//# sourceMappingURL=ogreport.service.js.map