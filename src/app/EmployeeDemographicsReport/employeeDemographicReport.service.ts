import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IEmployeeDemographicDetail } from './employeeDemographicDetail';
import { Observable } from 'rxjs/Observable';
import { CONFIGURATION } from '../app.config';

@Injectable()
export class EmployeeDemographicReportService {
    private _empDemographicsReportUrl = CONFIGURATION.baseServiceUrl + 'demographicsreportservice/';
    constructor(private _http: Http) { }
    getReportData(): Observable<any> {
        return this._http.get(this._empDemographicsReportUrl + 'getDemographicsReferenceData')
            .map((response: Response) => response.json().demoGraphicsReferanceData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getEmployeeDemographicsReports(filterCriteria: any): Observable<IEmployeeDemographicDetail[]> {
        let fileName = 'getDemographicsReportData?WorkYear=' + filterCriteria.selectedYear
            + '&ControlGroup=' + filterCriteria.selectedContorlGroup
            + '&ParentCompnay=' + filterCriteria.selectedParentCompany
            + '&Proudctioncompany=' + filterCriteria.selectedProductionCompany
            + '&PayrollCompany=' + filterCriteria.selectedPayrollCompany;
        return this._http.get(this._empDemographicsReportUrl + fileName)
            .map((response: Response) => <IEmployeeDemographicDetail[]>response.json().demoGraphicsReportData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    downloadExcelReport(filterCriteria: any): void {
        let fileName = 'processDemographicsServiceReportExcelUpload?WorkYear='
            + filterCriteria.selectedYear + '&ControlGroup=' + filterCriteria.selectedContorlGroup
            + '&ParentCompnay=' + filterCriteria.selectedParentCompany
            + '&Proudctioncompany=' + filterCriteria.selectedProductionCompany
            + '&PayrollCompany=' + filterCriteria.selectedPayrollCompany;

        window.open(this._empDemographicsReportUrl + fileName, '_bank');
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Failed in web api(Server error) ');
    }
}
