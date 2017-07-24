import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IOnboardingCustomerInformation } from './IOnboardingCustomerInformation';
import { Http, Response, Headers } from '@angular/http';
import { CONFIGURATION } from '../app.config';

@Injectable()
export class ClientOnboardingCustomerInfoService {
  private _cociUrl = CONFIGURATION.baseDataBoardingUrl + 'clientonboardingservice/';

  constructor(private _http: Http) { }

  addClientOnboarding(newObj: IOnboardingCustomerInformation) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const content = JSON.stringify(newObj);

    return this._http.post(this._cociUrl + 'addclient', content, {
      headers: headers
    }).map((response: Response) => response.json())
      .do(data => console.log('Add Client Onboarding result: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getAllControlGroups(): Observable<IOnboardingCustomerInformation[]> {
    return this._http.get(this._cociUrl + 'loadallcontrolgroup')
      .map((response: Response) => response.json().controlGroupData)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
