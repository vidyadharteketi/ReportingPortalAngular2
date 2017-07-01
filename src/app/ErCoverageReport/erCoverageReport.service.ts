import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IErCoverageWorkDetail } from './erCoverageWorkDetail';
import { Observable } from 'rxjs/Observable';
import { CONFIGURATION } from '../app.config';


@Injectable()
export class ErCoverageReportService {

    // private _erCoverageReportUrl = 'app/api/';
    private _erCoverageReportUrl = CONFIGURATION.baseServiceUrl + 'ercoveragereportservice/';

    constructor(private _http: Http) { }

    getReportData(): Observable<any> {
        return this._http.get(this._erCoverageReportUrl + 'getERCoverageReportReferenceData')
            .map((response: Response) => response.json().erCoverageReferanceDataVO)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAnnulaizedMonthlyWorkers(filterCriteria: any): Observable<any> {
        let fileName: string = 'getERCoverageReportCountByWeek?WorkYear=' + filterCriteria.selectedYear
            + '&ControlGroup=' + filterCriteria.selectedControlGroup;
        return this._http.get(this._erCoverageReportUrl + fileName)
            .map((response: Response) => response.json().annualizedMonthlyCountVO)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);

        //  return { annulaizedMonthly: "26" };
    }

    getAnnulaizedMonthlyWorkersReportData(filterCriteria: any): Observable<IErCoverageWorkDetail[]> {

        let fileName = 'getERCoverageReportData?WorkYear=' + filterCriteria.selectedYear
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '';
        return this._http.get(this._erCoverageReportUrl + fileName)
            .map((response: Response) => <IErCoverageWorkDetail[]>response.json().reportsByAnnualizedMonthlyCountVO)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

     downloadExcelReport(filterCriteria: any): void {
        let fileName = 'processERCoverageReportExcelUpload?WorkYear=' + filterCriteria.selectedYear
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '';

        window.open(this._erCoverageReportUrl + fileName, '_bank');
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Failed in web api(Server error) ');
    }

}
