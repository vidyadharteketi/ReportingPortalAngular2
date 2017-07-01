import { Component } from '@angular/core';
import { CONFIGURATION } from '../app.config';

@Component({
    moduleId: module.id,
    selector: 'sidenav',
    templateUrl: 'sidenav.html'
})
export class SideNavComponent {
    route: string = CONFIGURATION.reportingroute;
    dashboard: string = CONFIGURATION.dashboard;
    nftreport: string = CONFIGURATION.nftreport;
    enftreport: string = CONFIGURATION.enftreport;
    ogreport: string = CONFIGURATION.ogreport;
    pdareport: string = CONFIGURATION.pdareport;
    ercreport: string = CONFIGURATION.ercreport;
    empsummary: string = CONFIGURATION.empsummary;
    empeligilbility: string = CONFIGURATION.empeligilbility;
    empdemographics: string = CONFIGURATION.empdemographics;
    empbreakinservice: string = CONFIGURATION.empbreakinservice;
    addcustomer: string = CONFIGURATION.addcustomer;
    listcustomer: string = CONFIGURATION.listcustomer;
    onboardingcustomerinformation: string = CONFIGURATION.onboardingcustomerinformation;
    clientpayroll: string = CONFIGURATION.clientpayroll;
    onboardingpersonalinformation: string = CONFIGURATION.onboardingpersonalinformation;
    uploaddata: string = CONFIGURATION.uploaddata;
    aledataupload: string = CONFIGURATION.aledataupload;
    payrolldataupload: string = CONFIGURATION.payrolldataupload;
    insurancedataupload: string = CONFIGURATION.insurancedataupload;
    onezeroninefourdataupload: string = CONFIGURATION.onezeroninefourdataupload;
    onezeroninefivedataupload: string = CONFIGURATION.onezeroninefivedataupload;
    controlgroup = CONFIGURATION.controlgroup;
    ale = CONFIGURATION.ale;
}
