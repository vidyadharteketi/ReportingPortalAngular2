import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ClientOnboardingCustomerInfoService } from './onboardingCustomerInformation.service';
import { IOnboardingCustomerInformation } from './IOnboardingCustomerInformation';
// import { EmployeeBreakInServiceReportService } from './employeeBreakInServiceReport.service';
// import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
// import { ExportToExcelService } from '../shared/export.service';

@Component({
    moduleId: module.id,
    templateUrl: 'onboardingCustomerInformation.html'

})
export class OnboardingCustomerInformationComponent implements OnInit {

  data: Array<IOnboardingCustomerInformation>;
  dataLoaded: boolean;
  errorMessage: string;
  ociObj: IOnboardingCustomerInformation;

  clientOnboardingForm: FormGroup;
  private idControl: FormControl;
  private controlGroupNameControl: FormControl;
  private addressControl: FormControl;
  private cityControl: FormControl;
  private stateControl: FormControl;
  private zipControl: FormControl;
  private gcNameControl: FormControl;
  private gcTitleControl: FormControl;
  private gcEmailControl: FormControl;
  private gcPhoneControl: FormControl;
  private oicNameControl: FormControl;
  private oicTitleControl: FormControl;
  private oicEmailControl: FormControl;
  private oicPhoneControl: FormControl;

  constructor(private _service: ClientOnboardingCustomerInfoService) {

  }

  ngOnInit(): void {
    this.initializeFormControls();
    this.loadGridData();
  }

  loadGridData(): void {
    this.dataLoaded = false;
    this._service.getAllControlGroups().subscribe(value => {
        this.data = value;
        if (this.data.length > 0) {
          this.dataLoaded = true;
        }
      },
      error => this.errorMessage = <any>error);
  }
  initializeFormControls() {
    this.idControl = new FormControl('');
    this.controlGroupNameControl = new FormControl('');
    this.addressControl = new FormControl('');
    this.cityControl = new FormControl('');
    this.stateControl = new FormControl('');
    this.zipControl = new FormControl('');
    this.gcNameControl = new FormControl('');
    this.gcTitleControl = new FormControl('');
    this.gcEmailControl = new FormControl('');
    this.gcPhoneControl = new FormControl('');
    this.oicNameControl = new FormControl('');
    this.oicTitleControl = new FormControl('');
    this.oicEmailControl = new FormControl('');
    this.oicPhoneControl = new FormControl('');


    this.clientOnboardingForm = new FormGroup(
      {
        idControl: this.idControl,
        controlGroupNameControl: this.controlGroupNameControl,
        addressControl: this.addressControl,
        cityControl: this.cityControl,
        stateControl: this.stateControl,
        zipControl: this.zipControl,
        gcNameControl: this.gcNameControl,
        gcTitleControl: this.gcTitleControl,
        gcEmailControl: this.gcEmailControl,
        gcPhoneControl: this.gcPhoneControl,
        oicNameControl: this.oicNameControl,
        oicTitleControl: this.oicTitleControl,
        oicEmailControl: this.oicEmailControl,
        oicPhoneControl: this.oicPhoneControl,
      }
    );
  }

  clearControlGroupObjectFromForm(): void {
    const emptyObj = <IOnboardingCustomerInformation>{};

  }
  updateClientOnboardingInfo(): void {

  }
  deleteClientOnboardingInfo(): void {

  }
  addClientOnboardingInfo(): void {

  }

}
