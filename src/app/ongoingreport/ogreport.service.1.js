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
var OnGoingReportService = (function () {
    function OnGoingReportService(_http) {
        this._http = _http;
        this._onGoingReportUrl = 'app/api/';
    }
    OnGoingReportService.prototype.getMonths = function () { return ['January', 'Feburary', 'March']; };
    OnGoingReportService.prototype.getControlGroups = function () { return ['Revolution', 'Cast & Crew']; };
    OnGoingReportService.prototype.getTypeOfHours = function () { return ['Union', 'Non Union']; };
    OnGoingReportService.prototype.getNonFullTimeCategories = function () { return ['Part Time', 'Seasonal', 'Un Category', 'Variable']; };
    OnGoingReportService.prototype.getWeeklyCounts = function () { return { count13Weeks: "3", count26Weeks: "4", count47Weeks: "5", count52Weeks: "6" }; };
    OnGoingReportService.prototype.getWeekReportData = function (weekCount) {
        var fileName = '';
        switch (weekCount) {
            case 13:
                fileName = "ogreport13.json";
                break;
            case 26:
                fileName = "ogreport26.json";
                break;
            case 47:
                break;
            case 52:
                break;
        }
        return this._http.get(this._onGoingReportUrl + fileName)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
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
//# sourceMappingURL=ogreport.service.1.js.map