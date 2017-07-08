import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IApplicableLargeEmployeeDetails } from './applicableLargeEmployeeDetails';
import { Http, Response, Headers } from '@angular/http';
import { CONFIGURATION } from '../app.config';

@Injectable()
export class ApplicableLargeEmployeeDetailsService {

    private _aleUrl = CONFIGURATION.baseDataBoardingUrl + 'aledetailsservice/';

    constructor(private _http: Http) { }

    addAleDetails(newObj: IApplicableLargeEmployeeDetails) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const content = JSON.stringify(newObj);

        return this._http.post(this._aleUrl + 'addaledetails', content, {
            headers: headers
        }).map((response: Response) => response.json())
            .do(data => console.log('Add ale result: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    removeAleDetails(id: string, detailsId: string, taxYear: string): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('AleId', id);
        headers.append('AleDetailsId', detailsId);
        headers.append('AleTaxYear', taxYear);
        const content = JSON.stringify({ AleId: id, AleDetailsId: detailsId, AleTaxYear: taxYear });

        return this._http.put(this._aleUrl + 'deletealedetails', content, { headers: headers })
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateAleDetails(obj: IApplicableLargeEmployeeDetails) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const content = JSON.stringify(obj);

        return this._http.put(this._aleUrl + 'updatealedetails', content, {
            headers: headers
        }).map((response: Response) => response.json())
            .do(data => console.log('Update ale : ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAleDetailsById(id: string, detailsId: string, taxYear: string): Observable<IApplicableLargeEmployeeDetails> {
        return this._http.get(this._aleUrl + 'loadaledetails?AleId=' + id + '&AleDetailsId=' + detailsId + '&AleTaxYear=' + taxYear)
            .map((response: Response) => response.json().aceDetails)
            .do(data => console.log('Get ALE by Id : ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAllAleDetails(): Observable<IApplicableLargeEmployeeDetails[]> {
        return this._http.get(this._aleUrl + 'loadallaledetails')
            .map((response: Response) => response.json().aleDetailsData)
            .do(data => console.log('Get All ALE : ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
