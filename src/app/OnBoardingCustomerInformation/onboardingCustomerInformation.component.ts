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
  message: string;
  ociObj: IOnboardingCustomerInformation;

  clientOnboardingForm: FormGroup;
  // private idControl: FormControl;
  // Client Information
  private aleNameControl: FormControl;
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
  private oicEmailControl: FormControl;
  private oicPhoneControl: FormControl;

  //General Information
  private reportingLegalEntitiesControl: FormControl;
  private reportingLegalEntitiesExplanationControl: FormControl;
  private entitiesOneFEINMultiplePayrollControl: FormControl;
  private authoritative1094CControl: FormControl;
  private aggregateFromOtherClientsControl: FormControl;
  private sendDataToOtherClientsControl: FormControl;

  //Payroll Information
  private isPayrollUnionControl: FormControl;
  private isPayrollNonUnionControl: FormControl;
  private isEPControl: FormControl;
  private isEMSControl: FormControl;
  private isCCControl: FormControl;
  private isMSControl: FormControl;
  private isADPControl: FormControl;
  private isEASEControl: FormControl;
  private isPaychexControl: FormControl;
  private isCAPSControl: FormControl;
  private isCeridianControl: FormControl;
  private isInHousePayrollControl: FormControl;
  private inHousePayrollSystemsControl: FormControl;
  private isOtherPayrollControl: FormControl;
  private otherPayrollDetailsControl: FormControl;

  //Corp Payroll Information
  private corpPayrollProviderControl: FormControl;
  private isCorpStaffUnderSameFEINControl: FormControl;
  private numberOfCorpEmployeesControl: FormControl;
  private isInsuranceOfferToCorpStaffControl: FormControl;
  private nameOfCorpInsuranceControl: FormControl;
  private corpInsuranceAdminSystemControl: FormControl;
  private corpInsuranceContactNameControl: FormControl;
  private corpInsuranceContactPhoneControl: FormControl;
  private corpInsuranceContactEmailControl: FormControl;
  private insuranceTypeForCorpInsuranceControl: FormControl;
  private corpMinEssentialCoverageControl: FormControl;
  private corpAffordablePlanControl: FormControl;
  private corpSafeHaborControl: FormControl;
  private corpMinValueControl: FormControl;
  private corpEligibleCoverageControl: FormControl;

  private isProdStaffUnderSameFEINControl: FormControl;
  private numberOfProdEmployeesControl: FormControl;
  private isInsuranceOfferToProdStaffControl: FormControl;
  private nameOfProdInsuranceControl: FormControl;
  private prodInsuranceAdminSystemControl: FormControl;
  private prodInsuranceContactNameControl: FormControl;
  private prodInsuranceContactPhoneControl: FormControl;
  private prodInsuranceContactEmailControl: FormControl;
  private insuranceTypeForProdInsuranceControl: FormControl;
  private prodMinEssentialCoverageControl: FormControl;
  private prodAffordablePlanControl: FormControl;
  private prodSafeHaborControl: FormControl;
  private prodMinValueControl: FormControl;
  private prodEligibleCoverageControl: FormControl;

  private numberALEMembersControl: FormControl;
  private aleName1Control: FormControl;
  private ein1Control: FormControl;
  private aleName2Control: FormControl;
  private ein2Control: FormControl;
  private aleName3Control: FormControl;
  private ein3Control: FormControl;
  private aleName4Control: FormControl;
  private ein4Control: FormControl;
  private aleName5Control: FormControl;
  private ein5Control: FormControl;
  private aleName6Control: FormControl;
  private ein6Control: FormControl;
  private aleName7Control: FormControl;
  private ein7Control: FormControl;
  private aleName8Control: FormControl;
  private ein8Control: FormControl;
  private aleName9Control: FormControl;
  private ein9Control: FormControl;
  private aleName10Control: FormControl;
  private ein10Control: FormControl;
  private aleName11Control: FormControl;
  private ein11Control: FormControl;
  private aleName12Control: FormControl;
  private ein12Control: FormControl;
  private aleName13Control: FormControl;
  private ein13Control: FormControl;
  private aleName14Control: FormControl;
  private ein14Control: FormControl;
  private aleName15Control: FormControl;
  private ein15Control: FormControl;
  private aleName16Control: FormControl;
  private ein16Control: FormControl;
  private aleName17Control: FormControl;
  private ein17Control: FormControl;
  private aleName18Control: FormControl;
  private ein18Control: FormControl;
  private aleName19Control: FormControl;
  private ein19Control: FormControl;
  private aleName20Control: FormControl;
  private ein20Control: FormControl;
  private aleName21Control: FormControl;
  private ein21Control: FormControl;
  private aleName22Control: FormControl;
  private ein22Control: FormControl;
  private aleName23Control: FormControl;
  private ein23Control: FormControl;
  private aleName24Control: FormControl;
  private ein24Control: FormControl;
  private aleName25Control: FormControl;
  private ein25Control: FormControl;
  private aleName26Control: FormControl;
  private ein26Control: FormControl;
  private aleName27Control: FormControl;
  private ein27Control: FormControl;
  private aleName28Control: FormControl;
  private ein28Control: FormControl;
  private aleName29Control: FormControl;
  private ein29Control: FormControl;
  private aleName30Control: FormControl;
  private ein30Control: FormControl;

  constructor(private _service: ClientOnboardingCustomerInfoService) {

  }

  ngOnInit(): void {
    this.initializeFormControls();
  }

  initializeFormControls() {
    // this.idControl = new FormControl('');
    this.aleNameControl = new FormControl('');
    this.controlGroupNameControl = new FormControl('');
    this.addressControl = new FormControl('');
    this.cityControl = new FormControl('');
    this.stateControl = new FormControl('CA');
    this.zipControl = new FormControl('');
    this.gcNameControl = new FormControl('');
    this.gcTitleControl = new FormControl('');
    this.gcEmailControl = new FormControl('');
    this.gcPhoneControl = new FormControl('');
    this.oicNameControl = new FormControl('');
    this.oicEmailControl = new FormControl('');
    this.oicPhoneControl = new FormControl('');

    this.reportingLegalEntitiesControl = new FormControl('');
    this.reportingLegalEntitiesExplanationControl = new FormControl('');
    this.entitiesOneFEINMultiplePayrollControl = new FormControl('');
    this.authoritative1094CControl = new FormControl('');
    this.aggregateFromOtherClientsControl = new FormControl('');
    this.sendDataToOtherClientsControl = new FormControl('');

    this.isPayrollUnionControl = new FormControl('');
    this.isPayrollNonUnionControl = new FormControl('');
    this.isEPControl = new FormControl('');
    this.isEMSControl = new FormControl('');
    this.isCCControl = new FormControl('');
    this.isEMSControl = new FormControl('');
    this.isMSControl = new FormControl('');
    this.isADPControl = new FormControl('');
    this.isEASEControl = new FormControl('');
    this.isPaychexControl = new FormControl('');
    this.isCAPSControl = new FormControl('');
    this.isCeridianControl = new FormControl('');
    this.isInHousePayrollControl = new FormControl('');
    this.inHousePayrollSystemsControl = new FormControl('');
    this.isOtherPayrollControl = new FormControl('');
    this.otherPayrollDetailsControl = new FormControl('');

    this.corpPayrollProviderControl = new FormControl('');
    this.isCorpStaffUnderSameFEINControl = new FormControl('');
    this.numberOfCorpEmployeesControl = new FormControl('');
    this.isInsuranceOfferToCorpStaffControl = new FormControl('');
    this.nameOfCorpInsuranceControl = new FormControl('');
    this.corpInsuranceAdminSystemControl = new FormControl('');
    this.corpInsuranceContactNameControl = new FormControl('');
    this.corpInsuranceContactPhoneControl = new FormControl('');
    this.corpInsuranceContactEmailControl = new FormControl('');
    this.insuranceTypeForCorpInsuranceControl = new FormControl('');
    this.corpMinEssentialCoverageControl = new FormControl('');
    this.corpAffordablePlanControl = new FormControl('');
    this.corpSafeHaborControl = new FormControl('');
    this.corpMinValueControl = new FormControl('');
    this.corpEligibleCoverageControl = new FormControl('');

    this.isProdStaffUnderSameFEINControl = new FormControl('');
    this.numberOfProdEmployeesControl = new FormControl('');
    this.isInsuranceOfferToProdStaffControl = new FormControl('');
    this.nameOfProdInsuranceControl = new FormControl('');
    this.prodInsuranceAdminSystemControl = new FormControl('');
    this.prodInsuranceContactNameControl = new FormControl('');
    this.prodInsuranceContactPhoneControl = new FormControl('');
    this.prodInsuranceContactEmailControl = new FormControl('');
    this.insuranceTypeForProdInsuranceControl = new FormControl('');
    this.prodMinEssentialCoverageControl = new FormControl('');
    this.prodAffordablePlanControl = new FormControl('');
    this.prodSafeHaborControl = new FormControl('');
    this.prodMinValueControl = new FormControl('');
    this.prodEligibleCoverageControl = new FormControl('');

    this.numberALEMembersControl = new FormControl('');
    this.aleName1Control = new FormControl('');
    this.ein1Control = new FormControl('');
    this.aleName2Control = new FormControl('');
    this.ein2Control = new FormControl('');
    this.aleName3Control = new FormControl('');
    this.ein3Control = new FormControl('');
    this.aleName4Control = new FormControl('');
    this.ein4Control = new FormControl('');
    this.aleName5Control = new FormControl('');
    this.ein5Control = new FormControl('');
    this.aleName6Control = new FormControl('');
    this.ein6Control = new FormControl('');
    this.aleName7Control = new FormControl('');
    this.ein7Control = new FormControl('');
    this.aleName8Control = new FormControl('');
    this.ein8Control = new FormControl('');
    this.aleName9Control = new FormControl('');
    this.ein9Control = new FormControl('');
    this.aleName10Control = new FormControl('');
    this.ein10Control = new FormControl('');
    this.aleName11Control = new FormControl('');
    this.ein11Control = new FormControl('');
    this.aleName12Control = new FormControl('');
    this.ein12Control = new FormControl('');
    this.aleName13Control = new FormControl('');
    this.ein13Control = new FormControl('');
    this.aleName14Control = new FormControl('');
    this.ein14Control = new FormControl('');
    this.aleName15Control = new FormControl('');
    this.ein15Control = new FormControl('');
    this.aleName16Control = new FormControl('');
    this.ein16Control = new FormControl('');
    this.aleName17Control = new FormControl('');
    this.ein17Control = new FormControl('');
    this.aleName18Control = new FormControl('');
    this.ein18Control = new FormControl('');
    this.aleName19Control = new FormControl('');
    this.ein19Control = new FormControl('');
    this.aleName20Control = new FormControl('');
    this.ein20Control = new FormControl('');
    this.aleName21Control = new FormControl('');
    this.ein21Control = new FormControl('');
    this.aleName22Control = new FormControl('');
    this.ein22Control = new FormControl('');
    this.aleName23Control = new FormControl('');
    this.ein23Control = new FormControl('');
    this.aleName24Control = new FormControl('');
    this.ein24Control = new FormControl('');
    this.aleName25Control = new FormControl('');
    this.ein25Control = new FormControl('');
    this.aleName26Control = new FormControl('');
    this.ein26Control = new FormControl('');
    this.aleName27Control = new FormControl('');
    this.ein27Control = new FormControl('');
    this.aleName28Control = new FormControl('');
    this.ein28Control = new FormControl('');
    this.aleName29Control = new FormControl('');
    this.ein29Control = new FormControl('');
    this.aleName30Control = new FormControl('');
    this.ein30Control = new FormControl('');


    this.clientOnboardingForm = new FormGroup(
      {
        // idControl: this.idControl,
        aleNameControl: this.aleNameControl,
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
        oicEmailControl: this.oicEmailControl,
        oicPhoneControl: this.oicPhoneControl,

        reportingLegalEntitiesControl: this.reportingLegalEntitiesControl,
        reportingLegalEntitiesExplanationControl: this.reportingLegalEntitiesExplanationControl,
        entitiesOneFEINMultiplePayrollControl: this.entitiesOneFEINMultiplePayrollControl,
        authoritative1094CControl: this.authoritative1094CControl,
        aggregateFromOtherClientsControl: this.aggregateFromOtherClientsControl,
        sendDataToOtherClientsControl: this.sendDataToOtherClientsControl,

        isPayrollUnionControl: this.isPayrollUnionControl,
        isPayrollNonUnionControl: this.isPayrollNonUnionControl,
        isEPControl: this.isEPControl,
        isCCControl: this.isCCControl,
        isEMSControl: this.isEMSControl,
        isMSControl: this.isMSControl,
        isADPControl: this.isADPControl,
        isCAPSControl: this.isCAPSControl,
        isEASEControl: this.isEASEControl,
        isPaychexControl: this.isPaychexControl,
        isCeridianControl: this.isCeridianControl,
        isInHousePayrollControl: this.isInHousePayrollControl,
        inHousePayrollSystemsControl: this.inHousePayrollSystemsControl,
        isOtherPayrollControl: this.isOtherPayrollControl,
        otherPayrollDetailsControl: this.otherPayrollDetailsControl,

        corpPayrollProviderControl: this.corpPayrollProviderControl,
        isCorpStaffUnderSameFEINControl: this.isCorpStaffUnderSameFEINControl,
        numberOfCorpEmployeesControl: this.numberOfCorpEmployeesControl,
        isInsuranceOfferToCorpStaffControl: this.isInsuranceOfferToCorpStaffControl,
        nameOfCorpInsuranceControl: this.nameOfCorpInsuranceControl,
        corpInsuranceAdminSystemControl: this.corpInsuranceAdminSystemControl,
        corpInsuranceContactNameControl: this.corpInsuranceContactNameControl,
        corpInsuranceContactPhoneControl: this.corpInsuranceContactPhoneControl,
        corpInsuranceContactEmailControl: this.corpInsuranceContactEmailControl,
        insuranceTypeForCorpInsuranceControl: this.insuranceTypeForCorpInsuranceControl,
        corpMinEssentialCoverageControl: this.corpMinEssentialCoverageControl,
        corpAffordablePlanControl: this.corpAffordablePlanControl,
        corpSafeHaborControl: this.corpSafeHaborControl,
        corpMinValueControl: this.corpMinValueControl,
        corpEligibleCoverageControl: this.corpEligibleCoverageControl,

        isProdStaffUnderSameFEINControl: this.isProdStaffUnderSameFEINControl,
        numberOfProdEmployeesControl: this.numberOfProdEmployeesControl,
        isInsuranceOfferToProdStaffControl: this.isInsuranceOfferToProdStaffControl,
        nameOfProdInsuranceControl: this.nameOfProdInsuranceControl,
        prodInsuranceAdminSystemControl: this.prodInsuranceAdminSystemControl,
        prodInsuranceContactNameControl: this.prodInsuranceContactNameControl,
        prodInsuranceContactPhoneControl: this.prodInsuranceContactPhoneControl,
        prodInsuranceContactEmailControl: this.prodInsuranceContactEmailControl,
        insuranceTypeForProdInsuranceControl: this.insuranceTypeForProdInsuranceControl,
        prodMinEssentialCoverageControl: this.prodMinEssentialCoverageControl,
        prodAffordablePlanControl: this.prodAffordablePlanControl,
        prodSafeHaborControl: this.prodSafeHaborControl,
        prodMinValueControl: this.prodMinValueControl,
        prodEligibleCoverageControl: this.prodEligibleCoverageControl,

        numberALEMembersControl: this.numberALEMembersControl,
        aleName1Control: this.aleName1Control,
        ein1Control: this.ein1Control,
        aleName2Control: this.aleName2Control,
        ein2Control: this.ein2Control,
        aleName3Control: this.aleName3Control,
        ein3Control: this.ein3Control,
        aleName4Control: this.aleName4Control,
        ein4Control: this.ein4Control,
        aleName5Control: this.aleName5Control,
        ein5Control: this.ein5Control,
        aleName6Control: this.aleName6Control,
        ein6Control: this.ein6Control,
        aleName7Control: this.aleName7Control,
        ein7Control: this.ein7Control,
        aleName8Control: this.aleName8Control,
        ein8Control: this.ein8Control,
        aleName9Control: this.aleName9Control,
        ein9Control: this.ein9Control,
        aleName10Control: this.aleName10Control,
        ein10Control: this.ein10Control,
        aleName11Control: this.aleName11Control,
        ein11Control: this.ein11Control,
        aleName12Control: this.aleName12Control,
        ein12Control: this.ein12Control,
        aleName13Control: this.aleName13Control,
        ein13Control: this.ein13Control,
        aleName14Control: this.aleName14Control,
        ein14Control: this.ein14Control,
        aleName15Control: this.aleName15Control,
        ein15Control: this.ein15Control,
        aleName16Control: this.aleName16Control,
        ein16Control: this.ein16Control,
        aleName17Control: this.aleName17Control,
        ein17Control: this.ein17Control,
        aleName18Control: this.aleName18Control,
        ein18Control: this.ein18Control,
        aleName19Control: this.aleName19Control,
        ein19Control: this.ein19Control,
        aleName20Control: this.aleName20Control,
        ein20Control: this.ein20Control,
        aleName21Control: this.aleName21Control,
        ein21Control: this.ein21Control,
        aleName22Control: this.aleName22Control,
        ein22Control: this.ein22Control,
        aleName23Control: this.aleName23Control,
        ein23Control: this.ein23Control,
        aleName24Control: this.aleName24Control,
        ein24Control: this.ein24Control,
        aleName25Control: this.aleName25Control,
        ein25Control: this.ein25Control,
        aleName26Control: this.aleName26Control,
        ein26Control: this.ein26Control,
        aleName27Control: this.aleName27Control,
        ein27Control: this.ein27Control,
        aleName28Control: this.aleName28Control,
        ein28Control: this.ein28Control,
        aleName29Control: this.aleName29Control,
        ein29Control: this.ein29Control,
        aleName30Control: this.aleName30Control,
        ein30Control: this.ein30Control,

      }
    );
  }

  clearControlGroupObjectFromForm(): void {
    const emptyObj = <IOnboardingCustomerInformation>{};

  }
  fillControlGroupObjectFromForm(): void {
    this.ociObj = <IOnboardingCustomerInformation>{};
    // this.ociObj.aleGroupName= this.cityControl.value;
    this.ociObj.controlledGroupName= this.controlGroupNameControl.value;
    this.ociObj.address= this.addressControl.value;
    this.ociObj.city= this.cityControl.value;
    this.ociObj.state= this.stateControl.value;
    this.ociObj.zip= this.zipControl.value;
    this.ociObj.generalContact= this.gcNameControl.value;
    this.ociObj.title= this.gcTitleControl.value;
    this.ociObj.email= this.gcEmailControl.value;
    this.ociObj.phone= this.gcPhoneControl.value;
    this.ociObj.contactForOnBoardingInquiries= this.oicNameControl.value;
    this.ociObj.onBoardingEmail= this.oicEmailControl.value;
    this.ociObj.onBoardingPhone= this.oicPhoneControl.value;
    this.ociObj.payrollProvidingService= this.reportingLegalEntitiesControl.value;
    this.ociObj.authoritativeOrNonAuthoritative1094C= this.reportingLegalEntitiesExplanationControl.value;
    this.ociObj.multiplePayrollProvider= this.entitiesOneFEINMultiplePayrollControl.value;
    this.ociObj.authoritativeOrNonAuthoritative1094C= this.authoritative1094CControl.value;
    this.ociObj.aggregatePayrollAndInsuranceData= this.aggregateFromOtherClientsControl.value;
    this.ociObj.sendDataForOtherEntityPayrolls= this.sendDataToOtherClientsControl.value;

    this.ociObj.payrollServiceProviderIsUnion= this.isPayrollUnionControl.value;
    this.ociObj.payrollServiceProviderIsNotUnion= this.isPayrollNonUnionControl.value;
    this.ociObj.payrollProviderEntertainmentPartners= this.isEPControl.value;
    this.ociObj.payrollProviderCastAndCrew= this.isCCControl.value;
    this.ociObj.payrollProviderMediaServices= this.isMSControl.value;
    this.ociObj.payrollProviderPayChex= this.isPaychexControl.value;
    this.ociObj.payrollProviderEMS= this.isEMSControl.value;
    this.ociObj.payrollProviderADP= this.isADPControl.value;
    this.ociObj.payrollProviderCeridian= this.isCeridianControl.value;
    this.ociObj.payrollProviderCaps= this.isCAPSControl.value;
    this.ociObj.payrollProviderInHouse= this.isInHousePayrollControl.value;
    this.ociObj.payrollProvderOther= this.isOtherPayrollControl.value;
    this.ociObj.ifInHouseAnyPayrollPrograms= this.inHousePayrollSystemsControl.value;

    this.ociObj.payrollProviderForCorporateEmployees= this.corpPayrollProviderControl.value;
    this.ociObj.corporateEmployeesUnderSameFeinAsProduction= this.isCorpStaffUnderSameFEINControl.value;
    this.ociObj.totalCorporateEmployeesEmployThisYear= this.numberOfCorpEmployeesControl.value;
    this.ociObj.insuranceOfferedToCorporateEmployees= this.isInsuranceOfferToCorpStaffControl.value;
    this.ociObj.ifYesCorpInsuranceCarrierName= this.nameOfCorpInsuranceControl.value;
    this.ociObj.ifYesCorpInsuranceAdministrativeSystem= this.corpInsuranceAdminSystemControl.value;
    this.ociObj.ifYesCorpInsurnaceCarrierContact= this.corpInsuranceContactNameControl.value;
    this.ociObj.ifYesCorpInsuranceCarrierPhone= this.corpInsuranceContactPhoneControl.value;
    this.ociObj.ifYesCorpInsuranceCarrierEmail= this.corpInsuranceContactEmailControl.value;
    this.ociObj.isCorpPlanFullySelfInsured= this.insuranceTypeForCorpInsuranceControl.value;
    this.ociObj.corpAcaProvidesMinimumEssentialCoverage= this.corpMinEssentialCoverageControl.value;
    this.ociObj.corpAcaAffordabilitySafeHarbour= this.corpSafeHaborControl.value;
    this.ociObj.corpAcaPlanProvidesMinimumValue= this.corpMinValueControl.value;
    this.ociObj.corpAcaEligiblePlanEnroll= this.corpEligibleCoverageControl.value;

    this.ociObj.productionEmployeesUnderSameFeinAsCorporate= this.isProdStaffUnderSameFEINControl.value;
    this.ociObj.totalProductionEmployeesCount= this.numberOfProdEmployeesControl.value;
    this.ociObj.prodInsuranceOffered= this.isInsuranceOfferToProdStaffControl.value;
    this.ociObj.ifYesProdInsuranceCarrierName= this.nameOfProdInsuranceControl.value;
    this.ociObj.ifYesProdInsuranceAdministrationSystem= this.prodInsuranceAdminSystemControl.value;
    this.ociObj.ifYesProdInsuranceCarrierContact= this.prodInsuranceContactNameControl.value;
    this.ociObj.ifYesProdInsuranceCarrierPhone= this.prodInsuranceContactPhoneControl.value;
    this.ociObj.ifYesProdInsuranceCarrierEmail= this.prodInsuranceContactEmailControl.value;
    this.ociObj.isProdPlanFullySelfInsured= this.insuranceTypeForProdInsuranceControl.value;
    this.ociObj.prodAcaProvidesMinimumEssentialCoverage= this.prodMinEssentialCoverageControl.value;
    this.ociObj.prodAcaAffordabilitySafeCoverage= this.prodSafeHaborControl.value;
    this.ociObj.prodAcaProvidesMinimumValue= this.prodMinValueControl.value;
    this.ociObj.prodAcaEligiblePlanEnrolled= this.prodEligibleCoverageControl.value;

    this.ociObj.aleMembersCount= this.numberALEMembersControl.value;
    this.ociObj.aleMemberName1= this.aleName1Control.value;
    this.ociObj.aleMemberEin1= this.ein1Control.value;
    this.ociObj.aleMemberName2= this.aleName2Control.value;
    this.ociObj.aleMemberEin2= this.ein2Control.value;
    this.ociObj.aleMemberName3= this.aleName3Control.value;
    this.ociObj.aleMemberEin3= this.ein3Control.value;
    this.ociObj.aleMemberName4= this.aleName4Control.value;
    this.ociObj.aleMemberEin4= this.ein4Control.value;
    this.ociObj.aleMemberName5= this.aleName5Control.value;
    this.ociObj.aleMemberEin5= this.ein5Control.value;
    this.ociObj.aleMemberName6= this.aleName6Control.value;
    this.ociObj.aleMemberEin6= this.ein6Control.value;
    this.ociObj.aleMemberName7= this.aleName7Control.value;
    this.ociObj.aleMemberEin7= this.ein7Control.value;
    this.ociObj.aleMemberName8= this.aleName8Control.value;
    this.ociObj.aleMemberEin8= this.ein8Control.value;
    this.ociObj.aleMemberName9= this.aleName9Control.value;
    this.ociObj.aleMemberEin9= this.ein9Control.value;
    this.ociObj.aleMemberName10= this.aleName10Control.value;
    this.ociObj.aleMemberEin10= this.ein10Control.value;
    this.ociObj.aleMemberName11= this.aleName11Control.value;
    this.ociObj.aleMemberEin11= this.ein11Control.value;
    this.ociObj.aleMemberName12= this.aleName12Control.value;
    this.ociObj.aleMemberEin12= this.ein12Control.value;
    this.ociObj.aleMemberName13= this.aleName13Control.value;
    this.ociObj.aleMemberEin13= this.ein13Control.value;
    this.ociObj.aleMemberName14= this.aleName14Control.value;
    this.ociObj.aleMemberEin14= this.ein14Control.value;
    this.ociObj.aleMemberName15= this.aleName15Control.value;
    this.ociObj.aleMemberEin15= this.ein15Control.value;
    this.ociObj.aleMemberName16= this.aleName16Control.value;
    this.ociObj.aleMemberEin16= this.ein16Control.value;
    this.ociObj.aleMemberName17= this.aleName17Control.value;
    this.ociObj.aleMemberEin17= this.ein17Control.value;
    this.ociObj.aleMemberName18= this.aleName18Control.value;
    this.ociObj.aleMemberEin18= this.ein18Control.value;
    this.ociObj.aleMemberName19= this.aleName19Control.value;
    this.ociObj.aleMemberEin19= this.ein19Control.value;
    this.ociObj.aleMemberName20= this.aleName20Control.value;
    this.ociObj.aleMemberEin20= this.ein20Control.value;
    this.ociObj.aleMemberName21= this.aleName21Control.value;
    this.ociObj.aleMemberEin21= this.ein21Control.value;
    this.ociObj.aleMemberName22= this.aleName22Control.value;
    this.ociObj.aleMemberEin22= this.ein22Control.value;
    this.ociObj.aleMemberName23= this.aleName23Control.value;
    this.ociObj.aleMemberEin23= this.ein23Control.value;
    this.ociObj.aleMemberName24= this.aleName24Control.value;
    this.ociObj.aleMemberEin24= this.ein24Control.value;
    this.ociObj.aleMemberName25= this.aleName25Control.value;
    this.ociObj.aleMemberEin25= this.ein25Control.value;
    this.ociObj.aleMemberName26= this.aleName26Control.value;
    this.ociObj.aleMemberEin26= this.ein26Control.value;
    this.ociObj.aleMemberName27= this.aleName27Control.value;
    this.ociObj.aleMemberEin27= this.ein27Control.value;
    this.ociObj.aleMemberName28= this.aleName28Control.value;
    this.ociObj.aleMemberEin28= this.ein28Control.value;
    this.ociObj.aleMemberName29= this.aleName29Control.value;
    this.ociObj.aleMemberEin29= this.ein29Control.value;
    this.ociObj.aleMemberName30= this.aleName30Control.value;
    this.ociObj.aleMemberEin30= this.ein30Control.value;
  }
  addClientOnboardingInfo(): void {
    this.fillControlGroupObjectFromForm();
    this._service.addClientOnboarding(this.ociObj)
      .subscribe(data => {
        if (data.result === 1) {
          this.message = "Success"
        }
      }, error => this.errorMessage = <any>error);
  }

}
