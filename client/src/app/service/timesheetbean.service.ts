import {Injectable} from '@angular/core';
import {TimesheetBean} from '../model/timesheetbean';
import 'rxjs/add/operator/toPromise';
import {AccessService} from './access.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TimesheetbeanService {

  constructor(private http: HttpClient, private accessService: AccessService) {
  }

  private url = 'http://localhost:3000/api';

  private timesheetBeans: TimesheetBean[] = null;

  getTimesheetBeans(): Promise<TimesheetBean[]> {
    return this.http.get(this.url + '/timerecord', {headers: this.accessService.getTokenHeader()})
  }

  newBean(bean: TimesheetBean) {
    return this.http.post(this.url + '/timerecord', bean, {headers: this.accessService.getTokenHeader()})

  }

  deleteRecord(bean: TimesheetBean) {
    return this.http.delete(this.url + '/timerecord/' + bean.id, {headers: this.accessService.getTokenHeader()})
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
