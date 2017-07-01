import './rxjs-extension';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Ng2TableModule } from 'ng2-table';
import { PaginationModule, TabsModule } from 'ng2-bootstrap';
import { APPROUTES } from './app.routes';
import { ExportToExcelService } from './shared/index';

import {
  SideNavComponent, TopNavComponent, ENFTReportComponent, ENFTReportService, OnGoingReportComponent,
  PayrollDataActivityReportComponent, PayrollDataActivityReportService,
  ErCoverageReportComponent, ErCoverageReportService,
  EmployeeEligibilityReportComponent, EmployeeEligibilityReportService,
  EmployeeDemographicReportComponent, EmployeeDemographicReportService,
  EmployeeBreakInServiceReportComponent, EmployeeBreakInServiceReportService,
  AddCustomerComponent,
  ListCustomerComponent,
  OnboardingCustomerInformationComponent,
  OnboardingPersonalInformationComponent,
  ControlGroupComponent, ApplicableLargeEmployeeComponent,
  ClientPayrollComponent,
  AleDataUploadComponent,
  InsuranceDataUploadComponent,
  OneZeroNineFourDataUploadComponent,
  OneZeroNineFiveDataUploadComponent,
  PayrollDataUploadComponent,
  EmployeeSummaryReportComponent, EmployeeSummaryReportService,
  OnGoingReportService, NewHireFullTimeComponent, NewHireFullTimeService, DashboardComponent, LoginComponent
} from './index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(APPROUTES, { useHash: true }),
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    SideNavComponent,
    TopNavComponent,
    ENFTReportComponent,
    OnGoingReportComponent,
    NewHireFullTimeComponent,
    PayrollDataActivityReportComponent,
    AddCustomerComponent,
    ListCustomerComponent,
    OnboardingCustomerInformationComponent,
    ClientPayrollComponent,
    OnboardingPersonalInformationComponent,
    AleDataUploadComponent,
    ControlGroupComponent,
    ApplicableLargeEmployeeComponent,
    ErCoverageReportComponent,
    EmployeeEligibilityReportComponent,
    EmployeeDemographicReportComponent,
    EmployeeBreakInServiceReportComponent,
    EmployeeSummaryReportComponent,
    InsuranceDataUploadComponent,
    OneZeroNineFourDataUploadComponent,
    OneZeroNineFiveDataUploadComponent,
    PayrollDataUploadComponent,
    LoginComponent
  ],
  providers: [
    ENFTReportService,
    OnGoingReportService,
    ExportToExcelService,
    NewHireFullTimeService,
    ErCoverageReportService,
    EmployeeEligibilityReportService,
    EmployeeDemographicReportService,
    EmployeeBreakInServiceReportService,
    PayrollDataActivityReportService,
    EmployeeSummaryReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

