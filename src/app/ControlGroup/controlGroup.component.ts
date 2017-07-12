import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ControlGroupService } from './controlGroup.service';
import { IControlGroup } from './controlGroup';

@Component({
    moduleId: module.id,
    templateUrl: 'controlGroup.html'
})
export class ControlGroupComponent implements OnInit {

    data: Array<IControlGroup>;
    dataLoaded: boolean;
    errorMessage: string;
    controlGroupObj: IControlGroup;

    cgForm: FormGroup;
    private idControl: FormControl;
    private EINControl: FormControl;
    private isActiveControl: FormControl;
    private isDeletedControl: FormControl;
    private nameControl: FormControl;
    private measurementStartDateControl: FormControl;
    private measurementEndDateControl: FormControl;
    private measureEndDate1Control: FormControl;
    private measureEndDate2Control: FormControl;
    private measureEndDate3Control: FormControl;
    private measureEndDate4Control: FormControl;

    constructor(private _service: ControlGroupService) {

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
        this.EINControl = new FormControl('');
        this.isActiveControl = new FormControl('');
        this.isDeletedControl = new FormControl('');
        this.nameControl = new FormControl('');
        this.measurementStartDateControl = new FormControl('');
        this.measurementEndDateControl = new FormControl('');
        this.measureEndDate1Control = new FormControl('');
        this.measureEndDate2Control = new FormControl('');
        this.measureEndDate3Control = new FormControl('');
        this.measureEndDate4Control = new FormControl('');
        this.cgForm = new FormGroup(
            {
                idControl: this.idControl,
                EINControl: this.EINControl,
                isActiveControl: this.isActiveControl,
                isDeletedControl: this.isDeletedControl,
                nameControl: this.nameControl,
                measurementStartDateControl: this.measurementStartDateControl,
                measurementEndDateControl: this.measurementEndDateControl,
                measureEndDate1Control: this.measureEndDate1Control,
                measureEndDate2Control: this.measureEndDate2Control,
                measureEndDate3Control: this.measureEndDate3Control,
                measureEndDate4Control: this.measureEndDate4Control,
            }
        );
    }
    clearForm() {
        // Clear all the control to default empty values
        const emptyObj = <IControlGroup>{};
        // this.fillFormControlWithControlGroup(emptyObj);
    }

    fillFormControlWithControlGroup(obj: IControlGroup): void {
        this.idControl.setValue(obj.controlGroupId);
        this.EINControl.setValue(obj.controlGroupEIN);
        this.nameControl.setValue(obj.controlGroupName);
        // obj.CreatedBy = '';
        // obj.CreatedDate = '';
        let active = false;
        if (obj.active === 'true') {
            active = true;
        }
        this.isActiveControl.setValue(active);
        let deleted = false;
        if (obj.deleted === 'true') {
            deleted = true;
        }
        this.isDeletedControl.setValue(obj.deleted);
        this.measurementStartDateControl.setValue(obj.measurementStartDate);
        this.measurementEndDateControl.setValue(obj.measurementEndDate);
        this.measureEndDate1Control.setValue(obj.measurementEndDate1);
        this.measureEndDate2Control.setValue(obj.measurementEndDate2);
        this.measureEndDate3Control.setValue(obj.measurementEndDate3)
        this.measureEndDate4Control.setValue(obj.measurementEndDate4);
        obj.modifiedBy = '';
    }

    fillControlGroupObjectFromForm(): void {
        this.controlGroupObj = <IControlGroup>{};
        this.controlGroupObj.controlGroupId = this.idControl.value;
        this.controlGroupObj.controlGroupEIN = this.EINControl.value;
        this.controlGroupObj.controlGroupName = this.nameControl.value;
        this.controlGroupObj.createdBy = '';
        this.controlGroupObj.createdDate = '';
        let active = 'false';
        if (this.isActiveControl.value === true) {
            active = 'true';
        }
        this.controlGroupObj.active = active;
        let deleted = 'false';
        if (this.isDeletedControl.value === true) {
            deleted = 'true';
        }
        this.controlGroupObj.deleted = deleted;
        this.controlGroupObj.measurementStartDate = this.measurementStartDateControl.value;
        this.controlGroupObj.measurementEndDate = this.measurementEndDateControl.value;
        this.controlGroupObj.measurementEndDate1 = this.measureEndDate1Control.value;
        this.controlGroupObj.measurementEndDate2 = this.measureEndDate2Control.value;
        this.controlGroupObj.measurementEndDate3 = this.measureEndDate3Control.value
        this.controlGroupObj.measurementEndDate4 = this.measureEndDate4Control.value;
        this.controlGroupObj.modifiedBy = '';
    }

    validateForm(): boolean {
        return true;
    }

    createControlGroup(): void {

        this.fillControlGroupObjectFromForm();
        this._service.addControlGroup(this.controlGroupObj)
            .subscribe(data => {
                if (data.result === 1) {
                    this.loadGridData();
                }
            }, error => this.errorMessage = <any>error);
    }

    editControlGroup(id: string, name: string): void {

        this._service.getControlGroupById(id, name)
            .subscribe(data => {
                this.fillFormControlWithControlGroup(data);
            }, error => this.errorMessage = <any>error);
    }


    updateControlGroup(): void {
        this.fillControlGroupObjectFromForm();
        this._service.updateControlGroup(this.controlGroupObj)
            .subscribe(data => {
                if (data.result === 1) {
                    this.loadGridData();
                }
            }, error => this.errorMessage = <any>error);
    }

    deleteControlGroup(id: string, name: string): void {

        if (confirm('Are you sure to delete ' + name)) {
            this._service.removeControlGroup(id, name)
                .subscribe(data => {
                    debugger;
                    if (data.result === 1) {
                        this.loadGridData();
                    }
                }, error => this.errorMessage = <any>error);
        }
    }
}
