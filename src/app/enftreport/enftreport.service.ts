import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IWorkDetails } from './workdetail';
import { Observable } from 'rxjs/Observable';
import { CONFIGURATION } from '../app.config';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ENFTReportService {
    private _enftreportUrl = CONFIGURATION.baseServiceUrl;
    private data: any;
    constructor(private _http: Http) {

    }

    getReportData(): Observable<any> {
        return this._http.get(this._enftreportUrl + 'newHiresNonFullTime/getNewHireNonFullTImeReferenceData')
            .map((response: Response) => response.json().EligibilityNewHiresNonFullTimeReferenceData)
            .do(data =>console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    getYears() { return this.data.WorkYear; }

    getMonths() { return this.data.WorkMonth; }

    getControlGroups() { return this.data.ControlGroup; }

    getTypeOfHours() { return this.data.UnionType; }

    getNonFullTimeCategories() { return this.data.EmployeeType; }

    getWeeklyCounts(filterCriteria:any): Observable<any> { 
        debugger;
        let fileName:string ="newHiresNonFullTime/getReportCountByWeek?WorkYear="+filterCriteria.selectedYear
        +"&WorkMonth="+filterCriteria.selectedHireMonth
        +"&ControlGroup="+filterCriteria.selectedControlGroup
        +"&UnionType="+filterCriteria.selectedTypeOfHours
        +"&EmployeeType="+filterCriteria.selectedNonFullTimeCatgeories+"";
        return this._http.get(this._enftreportUrl + fileName)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
        // return { count13Weeks: "3", count26Weeks: "4", count47Weeks: "5", count52Weeks: "6" };
     }

    getWeekReportData(filterCriteria: any): Observable<IWorkDetails[]> {
         let fileName:string ="newHiresNonFullTime/getReportsByWeeksCount?WorkYear="+filterCriteria.selectedYear
        +"&WorkMonth="+filterCriteria.selectedHireMonth
        +"&ControlGroup="+filterCriteria.selectedControlGroup
        +"&UnionType="+filterCriteria.selectedTypeOfHours
        +"&EmployeeType="+filterCriteria.selectedNonFullTimeCatgeories+"&ReportOfWeek="+filterCriteria.reportCount;   
        return this._http.get(this._enftreportUrl + fileName)
            .map((response: Response) => <IWorkDetails[]>response.json().reportByWeekCount)
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