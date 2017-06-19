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
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var app_config_1 = require("../app.config");
var NewHireFullTimeService = (function () {
    function NewHireFullTimeService(_http) {
        this._http = _http;
        this._nhftreportUrl = app_config_1.CONFIGURATION.baseServiceUrl;
    }
    NewHireFullTimeService.prototype.getReportData = function () {
        return this._http.get(this._nhftreportUrl + 'newHiresFullTime/getNewHireFullTimeReferenceData')
            .map(function (response) { return response.json().EligibilityNewHiresFullTimeReferenceData; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    NewHireFullTimeService.prototype.getEligibleFullTimeWorkers = function (filterCriteria) {
        var fileName = "newHiresFullTime/getACAEligibleCount?WorkYear=" + filterCriteria.selectedYear
            + "&WorkMonth=" + filterCriteria.selectedHireMonth
            + "&ControlGroup=" + filterCriteria.selectedControlGroup;
        return this._http.get(this._nhftreportUrl + fileName)
            .map(function (response) { return response.json().summaryCountForNewHireFullTimeVO; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
        // return { eftworkers: "26" }; 
    };
    NewHireFullTimeService.prototype.getEligibleFullTimeReportData = function (filterCriteria) {
        var fileName = "newHiresFullTime/getReportByACAEligibleCount?WorkYear=" + filterCriteria.selectedYear
            + "&WorkMonth=" + filterCriteria.selectedHireMonth
            + "&ControlGroup=" + filterCriteria.selectedControlGroup;
        return this._http.get(this._nhftreportUrl + fileName)
            .map(function (response) { return response.json().reportByACAEligibleCount; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    NewHireFullTimeService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Failed in web api(Server error) ');
    };
    return NewHireFullTimeService;
}());
NewHireFullTimeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], NewHireFullTimeService);
exports.NewHireFullTimeService = NewHireFullTimeService;
//# sourceMappingURL=nhftreport.service.js.map