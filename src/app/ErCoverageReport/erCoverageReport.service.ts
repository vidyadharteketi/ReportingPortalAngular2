import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IErCoverageWorkDetail } from './erCoverageWorkDetail';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ErCoverageReportService {

    //private _erCoverageReportUrl = 'app/api/';
    private _erCoverageReportUrl = "http://localhost:8080/NHNFTReportWebAPI/rest/";
    
    constructor(private _http: Http) { }

     getReportData(): Observable<any> {
        return this._http.get(this._erCoverageReportUrl + 'erCoverageReport/getERCoverageReferenceData')
            .map((response: Response) => response.json().erCoverageReferanceDataVO)
            .do(data =>console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    getAnnulaizedMonthlyWorkers(filterCriteria:any): Observable<any> 
    { 
         let fileName:string ="erCoverageReport/getAnnualizedMonthlyCount?WorkYear="+filterCriteria.selectedYear
        +"&ControlGroup="+filterCriteria.selectedControlGroup        
        return this._http.get(this._erCoverageReportUrl + fileName)
            .map((response: Response) => response.json().annualizedMonthlyCountVO)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
      
      //  return { annulaizedMonthly: "26" };
    }

    getAnnulaizedMonthlyWorkersReportData(filterCriteria:any): Observable<IErCoverageWorkDetail[]> {
        debugger;
        let fileName:string ="erCoverageReport/getReportsByAnnualizedMonthlyCount?WorkYear="+filterCriteria.selectedYear
        +"&ControlGroup="+filterCriteria.selectedControlGroup 
        +"";       
        return this._http.get(this._erCoverageReportUrl + fileName)
            .map((response: Response) => <IErCoverageWorkDetail[]>response.json().reportsByAnnualizedMonthlyCountVO)
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