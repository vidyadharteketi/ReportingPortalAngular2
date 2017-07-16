import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApplicableLargeEmployeeService } from './applicableLargeEmployee.service';
import { IApplicableLargeEmployee } from './applicableLargeEmployee';

@Component({
    moduleId: module.id,
    templateUrl: 'applicableLargeEmployee.html'

})

export class ApplicableLargeEmployeeComponent implements OnInit {

    data: Array<IApplicableLargeEmployee>;
    dataLoaded: boolean;
    errorMessage: string;
    aleObj: IApplicableLargeEmployee;

    aleForm: FormGroup;
    private idControl: FormControl;
    private FEINControl: FormControl;
    // private isActiveControl: FormControl;
    // private isDeletedControl: FormControl;
    private nameControl: FormControl;
    private address1Control: FormControl;
    private address2Control: FormControl;
    private stateControl: FormControl;
    private provinanceControl: FormControl;
    private zipControl: FormControl;
    private cityControl: FormControl;
    private countryControl: FormControl;
    private contactFirstNameControl: FormControl;
    private contactLastNameControl: FormControl;
    private contactNumberControl: FormControl;

    constructor(private _service: ApplicableLargeEmployeeService) {

    }

    ngOnInit(): void {
        this.initializeControls();
        this.loadGridData();
    }

    initializeControls(): void {
        this.idControl = new FormControl('');
        this.FEINControl = new FormControl(null,Validators.required);
        // this.isActiveControl = new FormControl('');
        // this.isDeletedControl = new FormControl('');
        this.nameControl = new FormControl(null,Validators.required);
        this.address1Control = new FormControl('');
        this.address2Control = new FormControl('');
        this.stateControl = new FormControl('');
        this.provinanceControl = new FormControl('');
        this.zipControl = new FormControl('');
        this.cityControl = new FormControl('');
        this.countryControl = new FormControl('');
        this.contactFirstNameControl = new FormControl('');
        this.contactLastNameControl = new FormControl('');
        this.contactNumberControl = new FormControl('');

        this.aleForm = new FormGroup({
           // idControl: this.idControl,
            FEINControl: this.FEINControl,
            // isActiveControl: this.isActiveControl,
            // isDeletedControl: this.isDeletedControl,
            nameControl: this.nameControl,
            address1Control: this.address1Control,
            address2Control: this.address2Control,
            stateControl: this.stateControl,
            provinanceControl: this.provinanceControl,
            zipControl: this.zipControl,
            cityControl: this.cityControl,
            countryControl: this.countryControl,
            contactFirstNameControl: this.contactFirstNameControl,
            contactLastNameControl: this.contactLastNameControl,
            contactNumberControl: this.contactNumberControl

        });
    }

    loadGridData(): void {
        this.dataLoaded = false;
        this._service.getAllAle().subscribe(value => {
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

    fillFormControlWithControlGroup(obj: IApplicableLargeEmployee): void {
        this.idControl.setValue(obj.aleId);
        this.FEINControl.setValue(obj.aleFein);
        this.nameControl.setValue(obj.aleName);
        // obj.CreatedBy = '';
        // obj.CreatedDate = '';
        // let active = false;
        // if (obj.active === 'true') {
        //     active = true;
        // }
        // this.isActiveControl.setValue(active);
        // let deleted = false;
        // if (obj.deleted === 'true') {
        //     deleted = true;
        // }
        // this.isDeletedControl.setValue(deleted);
        this.address1Control.setValue(obj.aleAddress1);
        this.address2Control.setValue(obj.aleAddress2);
        this.cityControl.setValue(obj.aleCity);
        this.stateControl.setValue(obj.aleState);
        this.countryControl.setValue(obj.aleCountry)
        this.provinanceControl.setValue(obj.aleProvince);
        this.zipControl.setValue(obj.aleZip);
        this.contactFirstNameControl.setValue(obj.aleContactFirstName);
        this.contactLastNameControl.setValue(obj.aleContactLastName);
        this.contactNumberControl.setValue(obj.aleContactContactNumber);
        this.zipControl.setValue(obj.aleZip);

        //obj.modifiedBy = '';
    }

    clearControlGroupObjectFromForm()
    {
        this.FEINControl.setValue('');    
        this.nameControl.setValue('');
        this.address1Control.setValue('');
        this.address2Control.setValue('');
        this.stateControl.setValue('');
        this.provinanceControl.setValue('');
        this.zipControl.setValue('');
        this.cityControl.setValue('');
        this.countryControl.setValue('');
        this.contactFirstNameControl.setValue('');
        this.contactLastNameControl.setValue('');
        this.contactNumberControl.setValue('');
    }
    fillControlGroupObjectFromForm(): void {
        this.aleObj = <IApplicableLargeEmployee>{};
        this.aleObj.aleId = this.idControl.value;
        this.aleObj.aleFein = this.FEINControl.value;
        this.aleObj.aleName = this.nameControl.value;
        this.aleObj.aleAddress1 = this.address1Control.value;
        this.aleObj.aleAddress2 = this.address2Control.value;
        // this.aleObj.createdBy = '';
        // this.aleObj.createdDate = '';
        // this.aleObj.active = this.isActiveControl.value;
        // this.aleObj.deleted = this.isDeletedControl.value;
        this.aleObj.aleCity = this.cityControl.value;
        this.aleObj.aleState = this.stateControl.value;
        this.aleObj.aleCountry = this.countryControl.value;
        this.aleObj.aleZip = this.zipControl.value;
        this.aleObj.aleProvince = this.provinanceControl.value;
        this.aleObj.aleContactFirstName = this.contactFirstNameControl.value
        this.aleObj.aleContactLastName = this.contactLastNameControl.value;
        this.aleObj.aleContactContactNumber = this.contactNumberControl.value;
    }

    validateForm(): boolean {
        return true;
    }

    createAle(): void {
        this.fillControlGroupObjectFromForm();
        this._service.addAle(this.aleObj)
            .subscribe(data => {
                if (data.result === 1) {
                    this.loadGridData();
                }
            }, error => this.errorMessage = <any>error);
    }

    editAle(id: string, name: string, fein: string): void {
         this._service.getAleById(id, name, fein)
            .subscribe(data => {
                this.fillFormControlWithControlGroup(data);
            }, error => this.errorMessage = <any>error);
    }

    updateAle(): void {
        this.fillControlGroupObjectFromForm();
        this._service.updateAle(this.aleObj)
            .subscribe(data => {
                if (data.result === 1) {
                    this.loadGridData();
                }
            }, error => this.errorMessage = <any>error);
    }


    deleteAle(id: string, name: string, fein: string): void {
        this.aleObj = <IApplicableLargeEmployee>{};
        this.aleObj.aleId = id;
        this.aleObj.aleFein = fein;
        this.aleObj.aleName = name;
    }

    deleteAleConfirm(): void {

            this._service.removeAle(this.aleObj.aleId, this.aleObj.aleName, this.aleObj.aleFein)
                .subscribe(data => {
                    if (data.result === 1) {
                        this.loadGridData();
                    }
                }, error => this.errorMessage = <any>error);
    }
}
