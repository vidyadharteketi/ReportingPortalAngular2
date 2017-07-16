import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IControlGroup } from './controlGroup';
import { Http, Response, Headers } from '@angular/http';
import { CONFIGURATION } from '../app.config';

@Injectable()
export class ControlGroupService {

  private _cgUrl = CONFIGURATION.baseDataBoardingUrl + 'controlgroupservice/';

  constructor(private _http: Http) { }

  addControlGroup(obj: IControlGroup) {
    debugger;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //const content = JSON.stringify(newObj);
    const content = JSON.stringify({
      //controlGroupId: obj.controlGroupId,
      controlGroupEIN: obj.controlGroupEIN,
      controlGroupName: obj.controlGroupName,
      active: obj.active,
      measurementStartDate: obj.measurementStartDate,
      measurementEndDate: obj.measurementEndDate,
      measurementEndDate1: obj.measurementEndDate1,
      measurementEndDate2: obj.measurementEndDate2,
      measurementEndDate3: obj.measurementEndDate3,
      measurementEndDate4: obj.measurementEndDate4
    });

    return this._http.post(this._cgUrl + 'addcontrolgroup', content, {
      headers: headers
    }).map((response: Response) => response.json())
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  removeControlGroup(id: string, name: string): Observable<any> {
    debugger;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('ControlGroupId', id);
    headers.append('ControlGroupName', name);
    const content = JSON.stringify({ ControlGroupId: id, ControlGroupName: name });

    return this._http.put(this._cgUrl + 'deletecontrolgroup', content, { headers: headers })
      .map((response: Response) => response.json())
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateControlGroup(obj: IControlGroup) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const content = JSON.stringify({
      controlGroupId: obj.controlGroupId,
      controlGroupEIN: obj.controlGroupEIN,
      controlGroupName: obj.controlGroupName,
      active: obj.active,
      measurementStartDate: obj.measurementStartDate,
      measurementEndDate: obj.measurementEndDate,
      measurementEndDate1: obj.measurementEndDate1,
      measurementEndDate2: obj.measurementEndDate2,
      measurementEndDate3: obj.measurementEndDate3,
      measurementEndDate4: obj.measurementEndDate4
    });
    // const content = JSON.stringify(obj);

    return this._http.put(this._cgUrl + 'updatecontrolgroup', content, {
      headers: headers
    }).map((response: Response) => response.json())
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getControlGroupById(id: string, name: string): Observable<IControlGroup> {
    return this._http.get(this._cgUrl + 'loadcontrolgroup/?ControlGroupId=' + id + '&ControlGroupName=' + name)
      .map((response: Response) => response.json().controlGroup)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getAllControlGroups(): Observable<IControlGroup[]> {
    return this._http.get(this._cgUrl + 'loadallcontrolgroup')
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
