import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {AccessService} from "./access.service";

@Injectable()
export class UserService {

  // TODO: Global
  private url: string = 'http://localhost:3000/api';

  constructor(private http: Http, private accessService: AccessService) { }

  getUserData(): Promise<any> {
    return this.http.get(this.url + "/user", { headers: this.accessService.getTokenHeader()})
      .toPromise()
      .then(data => {
        return data.json().message[0];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
