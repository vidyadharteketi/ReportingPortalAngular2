import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IEmployeeBreakInServiceDetail } from './employeeBreakInServiceDetail';
import { Observable } from 'rxjs/Observable';
import { CONFIGURATION } from '../app.config';

@Injectable()
export class EmployeeBreakInServiceReportService {

    private _empBreakInServiceReportUrl = CONFIGURATION.baseServiceUrl + 'breakinreportservice/';
    constructor(private _http: Http) { }

    getReportData(): Observable<any> {
        return this._http.get(this._empBreakInServiceReportUrl + 'getBreakInReportReferenceData')
            .map((response: Response) => response.json().breakInReferanceData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getEmployeeBreakInServiceReports(filterCriteria: any): Observable<IEmployeeBreakInServiceDetail[]> {
        let fileName = 'getBreakInServiceReportData?WorkYear=' + filterCriteria.selectedYear
            + '&ControlGroup=' + filterCriteria.selectedControlGroup;
        return this._http.get(this._empBreakInServiceReportUrl + fileName)
            .map((response: Response) => <IEmployeeBreakInServiceDetail[]>response.json().breakInReportData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    downloadExcelReport(filterCriteria: any): void {
        let fileName = 'processBreakInServiceReportExcelUpload?WorkYear=' + filterCriteria.selectedYear
            + '&ControlGroup=' + filterCriteria.selectedControlGroup;

        window.open(this._empBreakInServiceReportUrl + fileName, '_bank');
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Failed in web api(Server error) ');
    }
}
