import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IEmployeeSummaryDetail } from './employeeSummaryDetail';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeSummaryReportService {
    private _employeeSummaryReportUrl = 'app/api/';

    constructor(private _http: Http) { }
    getEmployeeSummaryReports(): Observable<IEmployeeSummaryDetail[]> {
        let fileName = 'employeeSummary.json';
        return this._http.get(this._employeeSummaryReportUrl + fileName)
            .map((response: Response) => <IEmployeeSummaryDetail[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Failed in web api(Server error) ');
    }
}
