import { Routes } from '@angular/router';
import {
    AppComponent, ENFTReportComponent, OnGoingReportComponent,
    NewHireFullTimeComponent, PayrollDataActivityReportComponent,
    DashboardComponent, LoginComponent, TopNavComponent,
    ErCoverageReportComponent,
    EmployeeEligibilityReportComponent,
    EmployeeDemographicReportComponent,
    EmployeeBreakInServiceReportComponent,
    AddCustomerComponent,
    ControlGroupComponent,
    ApplicableLargeEmployeeComponent,
    ListCustomerComponent,
    OnboardingCustomerInformationComponent,
    OnboardingPersonalInformationComponent,
    ClientPayrollComponent,
    EmployeeSummaryReportComponent,
    AleDataUploadComponent,
    InsuranceDataUploadComponent,
    OneZeroNineFourDataUploadComponent,
    OneZeroNineFiveDataUploadComponent,
    PayrollDataUploadComponent,
    SideNavComponent
} from './index';

export const APPROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'reporting', component: AppComponent },
    {
        path: 'reporting', children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'enftreport', component: ENFTReportComponent },
            { path: 'ogreport', component: OnGoingReportComponent },
            { path: 'nhftreport', component: NewHireFullTimeComponent },
            { path: 'pdareport', component: PayrollDataActivityReportComponent },
            { path: 'ercreport', component: ErCoverageReportComponent },
            { path: 'empeligilbility', component: EmployeeEligibilityReportComponent },
            { path: 'empdemographics', component: EmployeeDemographicReportComponent },
            { path: 'empbreakinservice', component: EmployeeBreakInServiceReportComponent },
            { path: 'addcustomer', component: AddCustomerComponent },
            { path: 'listcustomer', component: ListCustomerComponent },
            { path: 'onboardingcustomerinformation', component: OnboardingCustomerInformationComponent },
            { path: 'clientpayroll', component: ClientPayrollComponent },
            { path: 'onboardingpersonalinformation', component: OnboardingPersonalInformationComponent },
            { path: 'uploaddata', component: AleDataUploadComponent },
            { path: 'empsummary', component: EmployeeSummaryReportComponent },
            { path: 'controlgroup', component: ControlGroupComponent },
            { path: 'ale', component: ApplicableLargeEmployeeComponent },
            { path: 'aledataupload', component: AleDataUploadComponent },
            { path: 'payrolldataupload', component: PayrollDataUploadComponent },
            { path: 'onezeroninefourdataupload', component: OneZeroNineFourDataUploadComponent },
            { path: 'onezeroninefivedataupload', component: OneZeroNineFiveDataUploadComponent },
            { path: 'insurancedataupload', component: InsuranceDataUploadComponent },
            { path: '', component: TopNavComponent, outlet: 'header' },
            { path: '', component: SideNavComponent, outlet: 'sidebar' }
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];