"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var app_config_1 = require("../app.config");
var SideNavComponent = (function () {
    function SideNavComponent() {
        this.route = app_config_1.CONFIGURATION.reportingroute;
        this.dashboard = app_config_1.CONFIGURATION.dashboard;
        this.nftreport = app_config_1.CONFIGURATION.nftreport;
        this.enftreport = app_config_1.CONFIGURATION.enftreport;
        this.ogreport = app_config_1.CONFIGURATION.ogreport;
        this.pdareport = app_config_1.CONFIGURATION.pdareport;
        this.ercreport = app_config_1.CONFIGURATION.ercreport;
        this.empsummary = app_config_1.CONFIGURATION.empsummary;
        this.empeligilbility = app_config_1.CONFIGURATION.empeligilbility;
        this.empdemographics = app_config_1.CONFIGURATION.empdemographics;
        this.empbreakinservice = app_config_1.CONFIGURATION.empbreakinservice;
        this.addcustomer = app_config_1.CONFIGURATION.addcustomer;
        this.listcustomer = app_config_1.CONFIGURATION.listcustomer;
        this.onboardingcustomerinformation = app_config_1.CONFIGURATION.onboardingcustomerinformation;
        this.clientpayroll = app_config_1.CONFIGURATION.clientpayroll;
        this.onboardingpersonalinformation = app_config_1.CONFIGURATION.onboardingpersonalinformation;
        this.uploaddata = app_config_1.CONFIGURATION.uploaddata;
        this.aledataupload = app_config_1.CONFIGURATION.aledataupload;
        this.payrolldataupload = app_config_1.CONFIGURATION.payrolldataupload;
        this.insurancedataupload = app_config_1.CONFIGURATION.insurancedataupload;
        this.onezeroninefourdataupload = app_config_1.CONFIGURATION.onezeroninefourdataupload;
        this.onezeroninefivedataupload = app_config_1.CONFIGURATION.onezeroninefivedataupload;
        this.controlgroup = app_config_1.CONFIGURATION.controlgroup;
        this.ale = app_config_1.CONFIGURATION.ale;
    }
    return SideNavComponent;
}());
SideNavComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'sidenav',
        templateUrl: 'sidenav.html'
    })
], SideNavComponent);
exports.SideNavComponent = SideNavComponent;
//# sourceMappingURL=sidenav.component.js.map