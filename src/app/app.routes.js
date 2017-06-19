"use strict";
var index_1 = require("./index");
exports.APPROUTES = [
    { path: 'login', component: index_1.LoginComponent },
    { path: 'reporting', component: index_1.AppComponent },
    {
        path: 'reporting', children: [
            { path: 'dashboard', component: index_1.DashboardComponent },
            { path: 'enftreport', component: index_1.ENFTReportComponent },
            { path: 'ogreport', component: index_1.OnGoingReportComponent },
            { path: 'nhftreport', component: index_1.NewHireFullTimeComponent },
            { path: 'pdareport', component: index_1.PayrollDataActivityReportComponent },
            { path: 'ercreport', component: index_1.ErCoverageReportComponent },
            { path: 'empeligilbility', component: index_1.EmployeeEligibilityReportComponent },
            { path: 'empdemographics', component: index_1.EmployeeDemographicReportComponent },
            { path: 'empbreakinservice', component: index_1.EmployeeBreakInServiceReportComponent },
            { path: 'addcustomer', component: index_1.AddCustomerComponent },
            { path: 'listcustomer', component: index_1.ListCustomerComponent },
            { path: 'onboardingcustomerinformation', component: index_1.OnboardingCustomerInformationComponent },
            { path: 'clientpayroll', component: index_1.ClientPayrollComponent },
            { path: 'onboardingpersonalinformation', component: index_1.OnboardingPersonalInformationComponent },
            { path: 'uploaddata', component: index_1.AleDataUploadComponent },
            { path: 'empsummary', component: index_1.EmployeeSummaryReportComponent },
            { path: 'controlgroup', component: index_1.ControlGroupComponent },
            { path: 'ale', component: index_1.ApplicableLargeEmployeeComponent },
            { path: 'aledataupload', component: index_1.AleDataUploadComponent },
            { path: 'payrolldataupload', component: index_1.PayrollDataUploadComponent },
            { path: 'onezeroninefourdataupload', component: index_1.OneZeroNineFourDataUploadComponent },
            { path: 'onezeroninefivedataupload', component: index_1.OneZeroNineFiveDataUploadComponent },
            { path: 'insurancedataupload', component: index_1.InsuranceDataUploadComponent },
            { path: '', component: index_1.TopNavComponent, outlet: 'header' },
            { path: '', component: index_1.SideNavComponent, outlet: 'sidebar' }
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
//# sourceMappingURL=app.routes.js.map