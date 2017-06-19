import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IWorkDetails } from './workdetail';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { CONFIGURATION } from '../app.config';
@Injectable()
export class OnGoingReportService {
    private _onGoingReportUrl = CONFIGURATION.baseServiceUrl;

    constructor(private _http: Http) {

    }

    getReportData(): Observable<any> {
        return this._http.get(this._onGoingReportUrl + 'eligibilityReportOngoing/getOnGoingReportReferenceData')
            .map((response: Response) => response.json().eligibilityReportOngoingVO)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    getOnGoingReportDataCount(filterCriteria: any): Observable<any> {
        let fileName: string = "eligibilityReportOngoing/getOnGoingCountByWeeks?MeasurementEndDate=" + filterCriteria.selectedMeasuredDate
            + "&AvgWeeklyHours=" + filterCriteria.avgWeeklyThreshold
            + "&ControlGroup=" + filterCriteria.selectedControlGroup
            + "&UnionType=" + filterCriteria.selectedTypeOfHours;

        return this._http.get(this._onGoingReportUrl + fileName)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getOnGoingReportData(filterCriteria: any): Observable<IWorkDetails[]> {
        debugger;
        let fileName: string = "eligibilityReportOngoing/getOnGoingReportsByWeeksCount?MeasurementEndDate=" + filterCriteria.selectedMeasuredDate
            + "&AvgWeeklyHours=" + filterCriteria.avgWeeklyThreshold
            + "&ControlGroup=" + filterCriteria.selectedControlGroup
            + "&UnionType=" + filterCriteria.selectedTypeOfHours
            + "&ReportOfWeek=" + filterCriteria.reportCount;

        return this._http.get(this._onGoingReportUrl + fileName)
            .map((response: Response) =><IWorkDetails[]>response.json().onGoingReportsByWeekCount)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getMeasurementEndDates() { return ['26-10-2016', '29-10-2017'] }

    getControlGroups() { return ['Revolution', 'Cast & Crew'] }

    getTypeOfHours() { return ['Union', 'Non Union'] }


    getWeeklyCounts(): any { return { count13Weeks: "3", count26Weeks: "4", count47Weeks: "5", count52Weeks: "6" }; }

    getWeekReportData(weekCount: number): Observable<IWorkDetails[]> {
        let fileName: string = '';
        switch (weekCount) {
            case 13:
                fileName = "ogreport13.json";
                break;
            case 26:
                fileName = "ogreport26.json";
                break;
            case 47:
                break;
            case 52:
                break;
        }
        return this._http.get(this._onGoingReportUrl + fileName)
            .map((response: Response) => <IWorkDetails[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        debugger;
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}