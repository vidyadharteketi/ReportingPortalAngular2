
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { InhftWorkDetail } from './nhftworkdetail';
import { Observable } from 'rxjs/Observable';
import { CONFIGURATION } from '../app.config';

@Injectable()
export class NewHireFullTimeService {
    private _nhftreportUrl = CONFIGURATION.baseServiceUrl + 'newhiresfulltimereportservice/';
    constructor(private _http: Http) { }


    getReportData(): Observable<any> {
        return this._http.get(this._nhftreportUrl + 'getNewHiresFullTimeReportReferenceData')
            .map((response: Response) => response.json().EligibilityNewHiresFullTimeReferenceData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getEligibleFullTimeWorkers(filterCriteria: any): Observable<any> {
        let fileName: string = "getNewHiresFullTimeCountByWeek?WorkYear=" + filterCriteria.selectedYear
            + "&WorkMonth=" + filterCriteria.selectedHireMonth
            + "&ControlGroup=" + filterCriteria.selectedControlGroup;
        return this._http.get(this._nhftreportUrl + fileName)
            .map((response: Response) => response.json().summaryCountForNewHireFullTimeVO)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);

        // return { eftworkers: "26" }; 
    }

    getEligibleFullTimeReportData(filterCriteria: any): Observable<InhftWorkDetail[]> {

        let fileName = "getNewHiresFullTimeReportData?WorkYear=" + filterCriteria.selectedYear
            + "&WorkMonth=" + filterCriteria.selectedHireMonth
            + "&ControlGroup=" + filterCriteria.selectedControlGroup;
        return this._http.get(this._nhftreportUrl + fileName)
            .map((response: Response) => <InhftWorkDetail[]>response.json().reportByACAEligibleCount)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

      downloadExcelReport(filterCriteria: any): void {
        let fileName = "processNewHireFullTimeExcelUpload?WorkYear=" + filterCriteria.selectedYear
            + "&WorkMonth=" + filterCriteria.selectedHireMonth
            + "&ControlGroup=" + filterCriteria.selectedControlGroup;

        window.open(this._nhftreportUrl + fileName, '_bank');
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Failed in web api(Server error) ');
    }


}
