import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {TimesheetBean} from "../model/timesheetbean";
import "rxjs/add/operator/toPromise";

@Injectable()
export class TimesheetbeanService {

  constructor(private http: Http) { }

  private url = 'http://localhost:3000/api';

  private timesheetBeans: TimesheetBean[] = null;

  getDevices(): Promise<TimesheetBean[]> {
    return this.http.get(this.url + "/timerecord")
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  newBean(bean: TimesheetBean) {
    return this.http.post(this.url + "/timerecord", bean)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  deleteRecord(bean: TimesheetBean) {
    return this.http.delete(this.url + "/timerecord/" + bean.id)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
