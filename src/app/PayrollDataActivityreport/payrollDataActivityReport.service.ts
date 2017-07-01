import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IWorkDetails } from './workdetail';
import { Observable } from 'rxjs/Observable';

import { CONFIGURATION } from '../app.config';



@Injectable()
export class PayrollDataActivityReportService {
    private _pdaReportUrl = CONFIGURATION.baseServiceUrl + 'payrolldataactivityreportservice/';
    constructor(private _http: Http) {

    }

    getReportData(): Observable<any> {
        return this._http.get(this._pdaReportUrl + 'getPayrollDataActivityReportReferenceData')
            .map((response: Response) => response.json().payrollRefDataVO)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPayrollDataActivityReportData(filterCriteria: any): Observable<IWorkDetails[]> {

        let fileName = 'getPayrollDataActivityReportData?WorkYear=' + filterCriteria.selectedYear
            + '&ControlGroup=' + filterCriteria.selectedControlGroup;
        return this._http.get(this._pdaReportUrl + fileName)
            .map((response: Response) => <IWorkDetails[]>response.json().reportsForPayrollDataActivity)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    downloadExcelReport(filterCriteria: any): void {
        let fileName = 'processPayrollDataActivityReportExcelUpload?WorkYear=' + filterCriteria.selectedYear
            + '&ControlGroup=' + filterCriteria.selectedControlGroup;

        window.open(this._pdaReportUrl + fileName, '_bank');
    }
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
