import './rxjs-extension';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Ng2TableModule } from 'ng2-table';
import { PaginationModule, TabsModule } from 'ng2-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { APPROUTES } from './app.routes';
import { ExportToExcelService } from './shared/index';
import {MdButtonModule, MdCheckboxModule, MdRadioModule, MdSelectModule} from '@angular/material';
import { NgUploaderModule } from 'ngx-uploader';

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
  ApplicableLargeEmployeeDetailsComponent,
  ClientPayrollComponent,
  AleDataUploadComponent,
  InsuranceDataUploadComponent,
  OneZeroNineFourDataUploadComponent,
  OneZeroNineFiveDataUploadComponent,
  PayrollDataUploadComponent,
  EmployeeSummaryReportComponent, EmployeeSummaryReportService,
  ControlGroupService, ApplicableLargeEmployeeService, ApplicableLargeEmployeeDetailsService,
  OnGoingReportService, NewHireFullTimeComponent, NewHireFullTimeService, DashboardComponent, LoginComponent
} from './index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdButtonModule, MdCheckboxModule,MdRadioModule, MdSelectModule,
    MultiselectDropdownModule,
    RouterModule.forRoot(APPROUTES, { useHash: true }),
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot()
    NgUploaderModule
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
    ApplicableLargeEmployeeDetailsComponent,
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
    EmployeeSummaryReportService,
    ControlGroupService,
    ApplicableLargeEmployeeService,
    ApplicableLargeEmployeeDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

