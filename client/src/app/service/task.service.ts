import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Task} from "../model/task";
import {TimesheetBean} from "../model/timesheetbean";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class TaskService {

  constructor(private http: Http) { }

  private url = 'http://localhost:3000/api/tasks';

  getTasks(): Promise<Task[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(result => {
        return result.json().data;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
