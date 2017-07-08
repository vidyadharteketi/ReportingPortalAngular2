import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IApplicableLargeEmployee } from './applicableLargeEmployee';
import { Http, Response, Headers } from '@angular/http';
import { CONFIGURATION } from '../app.config';

@Injectable()
export class ApplicableLargeEmployeeService {

    private _aleUrl = CONFIGURATION.baseDataBoardingUrl + 'aleservice/';

    constructor(private _http: Http) { }

    addAle(newObj: IApplicableLargeEmployee) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const content = JSON.stringify(newObj);

        return this._http.post(this._aleUrl + 'addale', content, {
            headers: headers
        }).map((response: Response) => response.json())
            .do(data => console.log('Add ale result: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    removeAle(id: string, name: string, fein: string): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('AleId', id);
        headers.append('AleName', name);
        headers.append('AleFein', fein);
        const content = JSON.stringify({ AleId: id, AleName: name, AleFein: fein });

        return this._http.put(this._aleUrl + 'deleteale', content, { headers: headers })
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateAle(obj: IApplicableLargeEmployee) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const content = JSON.stringify(obj);

        return this._http.put(this._aleUrl + 'updateale', content, {
            headers: headers
        }).map((response: Response) => response.json())
            .do(data => console.log('Update ale : ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAleById(id: string, name: string, fein: string): Observable<IApplicableLargeEmployee> {
        return this._http.get(this._aleUrl + 'loadale?AleId=' + id + '&AleName=' + name + '&AleFein=' + fein)
            .map((response: Response) => response.json().ale)
            .do(data => console.log('Get ALE by Id : ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAllAle(): Observable<IApplicableLargeEmployee[]> {
        return this._http.get(this._aleUrl + 'loadallale')
            .map((response: Response) => response.json().aleData)
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
