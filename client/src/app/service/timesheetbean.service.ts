import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {TimesheetBean} from "../model/timesheetbean";
import "rxjs/add/operator/toPromise";
import {AccessService} from "./access.service";

@Injectable()
export class TimesheetbeanService {

  constructor(private http: Http, private accessService: AccessService) { }

  private url = 'http://localhost:3000/api';

  private timesheetBeans: TimesheetBean[] = null;

  getTimesheetBeans(): Promise<TimesheetBean[]> {
    return this.http.get(this.url + "/timerecord", { headers: this.accessService.getTokenHeader() })
      .toPromise()
      .then(response => {
        if(response) return response.json().data;
        return null;
      })
      .catch(this.handleError);
  }

  newBean(bean: TimesheetBean) {
    return this.http.post(this.url + "/timerecord", bean, { headers: this.accessService.getTokenHeader() })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);

  }

  deleteRecord(bean: TimesheetBean) {
    return this.http.delete(this.url + "/timerecord/" + bean.id, {headers: this.accessService.getTokenHeader()})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
