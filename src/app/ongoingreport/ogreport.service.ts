import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IWorkDetails } from './workdetail';
import { Observable } from 'rxjs/Observable';
import { CONFIGURATION } from '../app.config';
@Injectable()
export class OnGoingReportService {
    private _onGoingReportUrl = CONFIGURATION.baseServiceUrl + 'ongoingreportservice/';

    constructor(private _http: Http) {

    }

    getReportData(): Observable<any> {
        return this._http.get(this._onGoingReportUrl + 'getonGoingreportreferencedata')
            .map((response: Response) => response.json().ongoingReportVO)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    getOnGoingReportDataCount(filterCriteria: any): Observable<any> {
        let fileName: string = 'getOnGoingReportCountByWeek?MeasurementEndDate=' + filterCriteria.selectedMeasuredDate
            + '&AvgWeeklyHours=' + filterCriteria.avgWeeklyThreshold
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '&UnionType=' + filterCriteria.selectedTypeOfHours;

        return this._http.get(this._onGoingReportUrl + fileName)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getOnGoingReportData(filterCriteria: any): Observable<IWorkDetails[]> {

        let fileName = 'getOnGoingReportReportData?MeasurementEndDate='
            + filterCriteria.selectedMeasuredDate
            + '&AvgWeeklyHours=' + filterCriteria.avgWeeklyThreshold
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '&UnionType=' + filterCriteria.selectedTypeOfHours
            + '&ReportOfWeek=' + filterCriteria.reportCount;

        return this._http.get(this._onGoingReportUrl + fileName)
            .map((response: Response) => <IWorkDetails[]>response.json().onGoingReportsByWeekCount)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    downloadExcelReport(filterCriteria: any): void {
        let fileName = 'processOnGoingReportExcelUpload?MeasurementEndDate='
            + filterCriteria.selectedMeasuredDate
            + '&AvgWeeklyHours=' + filterCriteria.avgWeeklyThreshold
            + '&ControlGroup=' + filterCriteria.selectedControlGroup
            + '&UnionType=' + filterCriteria.selectedTypeOfHours
            + '&ReportOfWeek=' + filterCriteria.reportCount;

        window.open(this._onGoingReportUrl + fileName, '_bank');
    }
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
