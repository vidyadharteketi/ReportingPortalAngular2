import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApplicableLargeEmployeeDetailsService } from './applicableLargeEmployeeDetails.service';
import { IApplicableLargeEmployeeDetails } from './applicableLargeEmployeeDetails';

@Component({
    moduleId: module.id,
    templateUrl: 'applicableLargeEmployeeDetails.html'

})

export class ApplicableLargeEmployeeDetailsComponent implements OnInit {


    data: Array<IApplicableLargeEmployeeDetails>;
    dataLoaded: boolean;
    errorMessage: string;
    aleDetailsObj: IApplicableLargeEmployeeDetails;

    aleDetailsForm: FormGroup;
    private aleDetailsIdControl: FormControl;
    private aleIdControl: FormControl;
    private aleTaxYearControl: FormControl;
    private isAcaSubscriberControl: FormControl;
    private isFilingAuthoritative1094cControl: FormControl;
    private isAcaReportingSharedControl: FormControl;
    private hTransitionReliefControl: FormControl;
    private additional1095cCountControl: FormControl;
    private controlGroupIdControl: FormControl;
    private additiontionalFulltimeEeJanControl: FormControl;
    private additiontionalFulltimeEeFebControl: FormControl;
    private additiontionalFulltimeEeMarControl: FormControl;
    private additiontionalFulltimeEeAprControl: FormControl;
    private additiontionalFulltimeEeMayControl: FormControl;
    private additiontionalFulltimeEeJunControl: FormControl;
    private additiontionalFulltimeEeJulControl: FormControl;
    private additiontionalFulltimeEeAugControl: FormControl;
    private additiontionalFulltimeEeSepControl: FormControl;
    private additiontionalFulltimeEeOctControl: FormControl;
    private additiontionalFulltimeEeNovControl: FormControl;
    private additiontionalFulltimeEeDecControl: FormControl;
    private additiontionalTotalEeJanControl: FormControl;
    private additiontionalTotalEeFebControl: FormControl;
    private additiontionalTotalEeMarControl: FormControl;
    private additiontionalTotalEeAprControl: FormControl;
    private additiontionalTotalEeMayControl: FormControl;
    private additiontionalTotalEeJunControl: FormControl;
    private additiontionalTotalEeJulControl: FormControl;
    private additiontionalTotalEeAugControl: FormControl;
    private additiontionalTotalEeSepControl: FormControl;
    private additiontionalTotalEeOctControl: FormControl;
    private additiontionalTotalEeNovControl: FormControl;
    private additiontionalTotalEeDecControl: FormControl;
    private activeControl: FormControl;
    private deletedControl: FormControl;
    private createdByControl: FormControl;
    private createdDateControl: FormControl;
    private modifiedByControl: FormControl;
    private modifiedDateControl: FormControl;

    constructor(private _service: ApplicableLargeEmployeeDetailsService) {

    }

    ngOnInit(): void {
        this.initializeControls();
        this.loadGridData();
    }

    initializeControls(): void {
        this.aleDetailsIdControl = new FormControl('');
        this.aleIdControl = new FormControl('');
        this.aleTaxYearControl = new FormControl('');
        this.isAcaSubscriberControl = new FormControl('');
        this.isFilingAuthoritative1094cControl = new FormControl('');
        this.isAcaReportingSharedControl = new FormControl('');
        this.hTransitionReliefControl = new FormControl('');
        this.additional1095cCountControl = new FormControl('');
        this.controlGroupIdControl = new FormControl('');
        this.additiontionalFulltimeEeJanControl = new FormControl('');
        this.additiontionalFulltimeEeFebControl = new FormControl('');
        this.additiontionalFulltimeEeMarControl = new FormControl('');
        this.additiontionalFulltimeEeAprControl = new FormControl('');
        this.additiontionalFulltimeEeMayControl = new FormControl('');
        this.additiontionalFulltimeEeJunControl = new FormControl('');
        this.additiontionalFulltimeEeJulControl = new FormControl('');
        this.additiontionalFulltimeEeAugControl = new FormControl('');
        this.additiontionalFulltimeEeSepControl = new FormControl('');
        this.additiontionalFulltimeEeOctControl = new FormControl('');
        this.additiontionalFulltimeEeNovControl = new FormControl('');
        this.additiontionalFulltimeEeDecControl = new FormControl('');
        this.additiontionalTotalEeJanControl = new FormControl('');
        this.additiontionalTotalEeFebControl = new FormControl('');
        this.additiontionalTotalEeMarControl = new FormControl('');
        this.additiontionalTotalEeAprControl = new FormControl('');
        this.additiontionalTotalEeMayControl = new FormControl('');
        this.additiontionalTotalEeJunControl = new FormControl('');
        this.additiontionalTotalEeJulControl = new FormControl('');
        this.additiontionalTotalEeAugControl = new FormControl('');
        this.additiontionalTotalEeSepControl = new FormControl('');
        this.additiontionalTotalEeOctControl = new FormControl('');
        this.additiontionalTotalEeNovControl = new FormControl('');
        this.additiontionalTotalEeDecControl = new FormControl('');
        this.activeControl = new FormControl('');
        this.deletedControl = new FormControl('');
        this.createdByControl = new FormControl('');
        this.createdDateControl = new FormControl('');
        this.modifiedByControl = new FormControl('');
        this.modifiedDateControl = new FormControl('');

        this.aleDetailsForm = new FormGroup({
            aleDetailsId: this.aleDetailsIdControl,
            aleId: this.aleIdControl,
            aleTaxYear: this.aleTaxYearControl,
            isAcaSubscriber: this.isAcaSubscriberControl,
            isFilingAuthoritative1094c: this.isFilingAuthoritative1094cControl,
            isAcaReportingShared: this.isAcaReportingSharedControl,
            hTransitionRelief: this.hTransitionReliefControl,
            additional1095cCount: this.additional1095cCountControl,
            controlGroupId: this.controlGroupIdControl,
            additiontionalFulltimeEeJan: this.additiontionalFulltimeEeJanControl,
            additiontionalFulltimeEeFeb: this.additiontionalFulltimeEeFebControl,
            additiontionalFulltimeEeMar: this.additiontionalFulltimeEeMarControl,
            additiontionalFulltimeEeApr: this.additiontionalFulltimeEeAprControl,
            additiontionalFulltimeEeMay: this.additiontionalFulltimeEeMayControl,
            additiontionalFulltimeEeJun: this.additiontionalFulltimeEeJunControl,
            additiontionalFulltimeEeJul: this.additiontionalFulltimeEeJulControl,
            additiontionalFulltimeEeAug: this.additiontionalFulltimeEeAugControl,
            additiontionalFulltimeEeSep: this.additiontionalFulltimeEeSepControl,
            additiontionalFulltimeEeOct: this.additiontionalFulltimeEeOctControl,
            additiontionalFulltimeEeNov: this.additiontionalFulltimeEeNovControl,
            additiontionalFulltimeEeDec: this.additiontionalFulltimeEeDecControl,
            additiontionalTotalEeJan: this.additiontionalTotalEeJanControl,
            additiontionalTotalEeFeb: this.additiontionalTotalEeFebControl,
            additiontionalTotalEeMar: this.additiontionalTotalEeMarControl,
            additiontionalTotalEeApr: this.additiontionalTotalEeAprControl,
            additiontionalTotalEeMay: this.additiontionalTotalEeMayControl,
            additiontionalTotalEeJun: this.additiontionalTotalEeJunControl,
            additiontionalTotalEeJul: this.additiontionalTotalEeJulControl,
            additiontionalTotalEeAug: this.additiontionalTotalEeAugControl,
            additiontionalTotalEeSep: this.additiontionalTotalEeSepControl,
            additiontionalTotalEeOct: this.additiontionalTotalEeOctControl,
            additiontionalTotalEeNov: this.additiontionalTotalEeNovControl,
            additiontionalTotalEeDec: this.additiontionalTotalEeDecControl,
            active: this.activeControl,
            deleted: this.deletedControl

        });
    }

    loadGridData(): void {
        this.dataLoaded = false;
        this._service.getAllAleDetails().subscribe(value => {
            this.data = value;
            if (this.data.length > 0) {
                this.dataLoaded = true;
            }
        },
            error => this.errorMessage = <any>error);
    }
    clearForm() {
        // Clear all the control to default empty values
    }

    fillFormControlWithControlGroup(obj: IApplicableLargeEmployeeDetails): void {

        let active = false;
        if (obj.active === 'true') {
            active = true;
        }
        this.activeControl.setValue(active);
        let deleted = false;
        if (obj.deleted === 'true') {
            deleted = true;
        }
        this.deletedControl.setValue(deleted);
        this.aleDetailsIdControl.setValue(obj.aleDetailsId);
        this.aleIdControl.setValue(obj.aleId);
        this.aleTaxYearControl.setValue(obj.aleTaxYear);
        this.isAcaSubscriberControl.setValue(obj.isAcaSubscriber);
        this.isFilingAuthoritative1094cControl.setValue(obj.isFilingAuthoritative1094c);
        this.isAcaReportingSharedControl.setValue(obj.isAcaReportingShared);
        this.hTransitionReliefControl.setValue(obj.hTransitionRelief);
        this.additional1095cCountControl.setValue(obj.additional1095cCount);
        this.controlGroupIdControl.setValue(obj.controlGroupId);
        this.additiontionalFulltimeEeJanControl.setValue(obj.additiontionalFulltimeEeJan);
        this.additiontionalFulltimeEeFebControl.setValue(obj.additiontionalFulltimeEeFeb);
        this.additiontionalFulltimeEeMarControl.setValue(obj.additiontionalFulltimeEeMar);
        this.additiontionalFulltimeEeAprControl.setValue(obj.additiontionalFulltimeEeApr);
        this.additiontionalFulltimeEeMayControl.setValue(obj.additiontionalFulltimeEeMay);
        this.additiontionalFulltimeEeJunControl.setValue(obj.additiontionalFulltimeEeJun);
        this.additiontionalFulltimeEeJulControl.setValue(obj.additiontionalFulltimeEeJul);
        this.additiontionalFulltimeEeAugControl.setValue(obj.additiontionalFulltimeEeAug);
        this.additiontionalFulltimeEeSepControl.setValue(obj.additiontionalFulltimeEeSep);
        this.additiontionalFulltimeEeOctControl.setValue(obj.additiontionalFulltimeEeOct);
        this.additiontionalFulltimeEeNovControl.setValue(obj.additiontionalFulltimeEeNov);
        this.additiontionalFulltimeEeDecControl.setValue(obj.additiontionalFulltimeEeDec);
        this.additiontionalTotalEeJanControl.setValue(obj.additiontionalTotalEeJan);
        this.additiontionalTotalEeFebControl.setValue(obj.additiontionalTotalEeFeb);
        this.additiontionalTotalEeMarControl.setValue(obj.additiontionalTotalEeMar);
        this.additiontionalTotalEeAprControl.setValue(obj.additiontionalTotalEeApr);
        this.additiontionalTotalEeMayControl.setValue(obj.additiontionalTotalEeMay);
        this.additiontionalTotalEeJunControl.setValue(obj.additiontionalTotalEeJun);
        this.additiontionalTotalEeJulControl.setValue(obj.additiontionalTotalEeJul);
        this.additiontionalTotalEeAugControl.setValue(obj.additiontionalTotalEeAug);
        this.additiontionalTotalEeSepControl.setValue(obj.additiontionalTotalEeSep);
        this.additiontionalTotalEeOctControl.setValue(obj.additiontionalTotalEeOct);
        this.additiontionalTotalEeNovControl.setValue(obj.additiontionalTotalEeNov);
        this.additiontionalTotalEeDecControl.setValue(obj.additiontionalTotalEeDec);
    }

    fillControlGroupObjectFromForm(): void {
        this.aleDetailsObj = <IApplicableLargeEmployeeDetails>{};
        this.aleDetailsObj.aleDetailsId = this.aleDetailsIdControl.value;
        this.aleDetailsObj.aleId = this.aleIdControl.value;
        this.aleDetailsObj.aleTaxYear = this.aleTaxYearControl.value;
        this.aleDetailsObj.isAcaSubscriber = this.isAcaSubscriberControl.value;
        this.aleDetailsObj.isFilingAuthoritative1094c = this.isFilingAuthoritative1094cControl.value;
        this.aleDetailsObj.isAcaReportingShared = this.isAcaReportingSharedControl.value;
        this.aleDetailsObj.hTransitionRelief = this.hTransitionReliefControl.value;
        this.aleDetailsObj.additional1095cCount = this.additional1095cCountControl.value;
        this.aleDetailsObj.controlGroupId = this.controlGroupIdControl.value;
        this.aleDetailsObj.additiontionalFulltimeEeJan = this.additiontionalFulltimeEeJanControl.value;
        this.aleDetailsObj.additiontionalFulltimeEeFeb = this.additiontionalFulltimeEeFebControl.value;
        this.aleDetailsObj.additiontionalFulltimeEeMar = this.additiontionalFulltimeEeMarControl.value;
        this.aleDetailsObj.additiontionalFulltimeEeApr = this.additiontionalFulltimeEeAprControl.value;
        this.aleDetailsObj.additiontionalFulltimeEeMay = this.additiontionalFulltimeEeMayControl.value;
        this.aleDetailsObj.additiontionalFulltimeEeJun = this.additiontionalFulltimeEeJunControl.value;
        this.aleDetailsObj.additiontionalFulltimeEeJul = this.additiontionalFulltimeEeJulControl.value;
        this.aleDetailsObj.additiontionalFulltimeEeAug = this.additiontionalFulltimeEeAugControl.value;
        this.aleDetailsObj.additiontionalFulltimeEeSep = this.additiontionalFulltimeEeSepControl.value;
        this.aleDetailsObj.additiontionalFulltimeEeOct = this.additiontionalFulltimeEeOctControl.value;
        this.aleDetailsObj.additiontionalFulltimeEeNov = this.additiontionalFulltimeEeNovControl.value;
        this.aleDetailsObj.additiontionalFulltimeEeDec = this.additiontionalFulltimeEeDecControl.value;
        this.aleDetailsObj.additiontionalTotalEeJan = this.additiontionalTotalEeJanControl.value;
        this.aleDetailsObj.additiontionalTotalEeFeb = this.additiontionalTotalEeFebControl.value;
        this.aleDetailsObj.additiontionalTotalEeMar = this.additiontionalTotalEeMarControl.value;
        this.aleDetailsObj.additiontionalTotalEeApr = this.additiontionalTotalEeAprControl.value;
        this.aleDetailsObj.additiontionalTotalEeMay = this.additiontionalTotalEeMayControl.value;
        this.aleDetailsObj.additiontionalTotalEeJun = this.additiontionalTotalEeJunControl.value;
        this.aleDetailsObj.additiontionalTotalEeJul = this.additiontionalTotalEeJulControl.value;
        this.aleDetailsObj.additiontionalTotalEeAug = this.additiontionalTotalEeAugControl.value;
        this.aleDetailsObj.additiontionalTotalEeSep = this.additiontionalTotalEeSepControl.value;
        this.aleDetailsObj.additiontionalTotalEeOct = this.additiontionalTotalEeOctControl.value;
        this.aleDetailsObj.additiontionalTotalEeNov = this.additiontionalTotalEeNovControl.value;
        this.aleDetailsObj.additiontionalTotalEeDec = this.additiontionalTotalEeDecControl.value;
        this.aleDetailsObj.active = this.activeControl.value;
    }

    validateForm(): boolean {
        return true;
    }

    createAleDetails(): void {
        this.fillControlGroupObjectFromForm();
        this._service.addAleDetails(this.aleDetailsObj)
            .subscribe(data => {
                if (data.result === 1) {
                    this.loadGridData();
                }
            }, error => this.errorMessage = <any>error);
    }

    editAleDetails(id: string, detailsId: string, taxYear: string): void {
        this._service.getAleDetailsById(id, detailsId, taxYear)
            .subscribe(data => {
                this.fillFormControlWithControlGroup(data);
            }, error => this.errorMessage = <any>error);
    }

    updateAleDetails(): void {
        this.fillControlGroupObjectFromForm();
        this._service.updateAleDetails(this.aleDetailsObj)
            .subscribe(data => {
                if (data.result === 1) {
                    this.loadGridData();
                }
            }, error => this.errorMessage = <any>error);
    }

    deleteAleDetails(id: string, detailsId: string, taxYear: string): void {

        if (confirm('Are you sure to delete ' + detailsId)) {
            this._service.removeAleDetails(id, detailsId, taxYear)
                .subscribe(data => {
                    if (data.result === 1) {
                        this.loadGridData();
                    }
                }, error => this.errorMessage = <any>error);
        }
    }
}
