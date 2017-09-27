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

  getTrelloBoards(): Promise<any> {
    return this.http.get(this.url + "/trelloBoard", { headers: this.accessService.getTokenHeader() })
      .toPromise()
      .then(data => {
        return data.json().data;
      })
      .catch(this.handleError);
  }

  editTrelloBoard(oldval, newval): Promise<any> {
    return this.http.put(this.url + "/trelloBoard", {old: oldval, val: newval}, { headers: this.accessService.getTokenHeader() })
      .toPromise()
      .then();
  }

  addTrelloBoard(board): Promise<any> {
    console.log(board);
    return this.http.post(this.url + "/trelloBoard", { boardid: board }, { headers: this.accessService.getTokenHeader() })
      .toPromise()
      .then(data => {
        return data.json();
      })
      .catch(this.handleError);
  }

  /**
   * TODO: Only for Test
   * @param error
   * @returns {Promise<never>}
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
