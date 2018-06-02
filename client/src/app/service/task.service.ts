import {Injectable} from '@angular/core';
import {Task} from '../model/task';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AccessService} from './access.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient, private accessService: AccessService) {
  }

  private url = 'http://localhost:3000/api/tasks';

  getTasks(): Promise<Task[]> {
    return this.http.get(this.url, {headers: this.accessService.getTokenHeader()})
      .toPromise()
      .then(result => {
        return result.json().data;
      })
      .catch(this.handleError);
  }

  createNewTask(param: { name: string; description: string }) {
    return this.http.post(this.url, param, {headers: this.accessService.getTokenHeader()})
      .toPromise()
      .then(data => {
        return data.json().message;
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
