import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IEmpEligibleWorkDetail } from './empeligibleworkdetail';
import { Observable } from 'rxjs/Observable';
import { CONFIGURATION } from '../app.config';


@Injectable()
export class EmployeeEligibilityReportService {
    private _empEligibleReportUrl = CONFIGURATION.baseServiceUrl + 'eligibilityreportservice/';
    constructor(private _http: Http) { }
    getReportReferenceData(): Observable<any> {
        return this._http.get(this._empEligibleReportUrl + 'getEligibilityReferenceData')
            .map((response: Response) => response.json().eligibilityReferanceData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getEmployeeEligibleReports(filterCriteria: any): Observable<IEmpEligibleWorkDetail[]> {
        let fileName = 'getEligibilityReportData?WorkYear=' + filterCriteria.selectedYear
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '&TypeOfHours=' + filterCriteria.selectedTypeOfHours
            + '&UnionStatus=' + filterCriteria.selectedUnionStatus;
        return this._http.get(this._empEligibleReportUrl + fileName)
            .map((response: Response) => <IEmpEligibleWorkDetail[]>response.json().eligibilityReportData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    downloadExcelReport(filterCriteria: any): void {
        let fileName = 'processEligibilityServiceReportExcelUpload?WorkYear=' + filterCriteria.selectedYear
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '&TypeOfHours=' + filterCriteria.selectedTypeOfHours
            + '&UnionStatus=' + filterCriteria.selectedUnionStatus;

        window.open(this._empEligibleReportUrl + fileName, '_bank');
    }
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Failed in web api(Server error) ');
    }
}
