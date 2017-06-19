
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { InhftWorkDetail } from './nhftworkdetail';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { CONFIGURATION } from '../app.config';
@Injectable()
export class NewHireFullTimeService
{
    private _nhftreportUrl = CONFIGURATION.baseServiceUrl;
    private data: any;
   constructor(private _http:Http){}
   

    getReportData(): Observable<any> {
        return this._http.get(this._nhftreportUrl + 'newHiresFullTime/getNewHireFullTimeReferenceData')
            .map((response: Response) => response.json().EligibilityNewHiresFullTimeReferenceData)
            .do(data =>console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    getEligibleFullTimeWorkers(filterCriteria:any): Observable<any>
     { 
       let fileName:string ="newHiresFullTime/getACAEligibleCount?WorkYear="+filterCriteria.selectedYear
        +"&WorkMonth="+filterCriteria.selectedHireMonth
        +"&ControlGroup="+filterCriteria.selectedControlGroup        
        return this._http.get(this._nhftreportUrl + fileName)
            .map((response: Response) => response.json().summaryCountForNewHireFullTimeVO)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
       
        // return { eftworkers: "26" }; 
    }   
    
    getEligibleFullTimeReportData(filterCriteria:any): Observable<InhftWorkDetail[]> {

      let fileName:string ="newHiresFullTime/getReportByACAEligibleCount?WorkYear="+filterCriteria.selectedYear
        +"&WorkMonth="+filterCriteria.selectedHireMonth
        +"&ControlGroup="+filterCriteria.selectedControlGroup       
        return this._http.get(this._nhftreportUrl + fileName)
            .map((response: Response) => <InhftWorkDetail[]>response.json().reportByACAEligibleCount)
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