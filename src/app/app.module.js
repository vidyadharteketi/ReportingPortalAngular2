"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var index_1 = require("./index");
var ng2_table_1 = require("ng2-table/ng2-table");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var app_routes_1 = require("./app.routes");
var index_2 = require("./shared/index");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot(app_routes_1.APPROUTES),
            ng2_table_1.Ng2TableModule,
            ng2_bootstrap_1.PaginationModule.forRoot(),
            ng2_bootstrap_1.TabsModule.forRoot()
        ],
        declarations: [
            app_component_1.AppComponent,
            index_1.DashboardComponent,
            index_1.SideNavComponent,
            index_1.TopNavComponent,
            index_1.ENFTReportComponent,
            index_1.OnGoingReportComponent,
            index_1.NewHireFullTimeComponent,
            index_1.PayrollDataActivityReportComponent,
            index_1.AddCustomerComponent,
            index_1.ListCustomerComponent,
            index_1.OnboardingCustomerInformationComponent,
            index_1.ClientPayrollComponent,
            index_1.OnboardingPersonalInformationComponent,
            index_1.AleDataUploadComponent,
            index_1.ControlGroupComponent,
            index_1.ApplicableLargeEmployeeComponent,
            index_1.ErCoverageReportComponent,
            index_1.EmployeeEligibilityReportComponent,
            index_1.EmployeeDemographicReportComponent,
            index_1.EmployeeBreakInServiceReportComponent,
            index_1.EmployeeSummaryReportComponent,
            index_1.InsuranceDataUploadComponent,
            index_1.OneZeroNineFourDataUploadComponent,
            index_1.OneZeroNineFiveDataUploadComponent,
            index_1.PayrollDataUploadComponent,
            index_1.LoginComponent
        ],
        providers: [
            index_1.ENFTReportService,
            index_1.OnGoingReportService,
            index_2.ExportToExcelService,
            index_1.NewHireFullTimeService,
            index_1.ErCoverageReportService,
            index_1.EmployeeEligibilityReportService,
            index_1.EmployeeDemographicReportService,
            index_1.EmployeeBreakInServiceReportService,
            index_1.PayrollDataActivityReportService,
            index_1.EmployeeSummaryReportService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map