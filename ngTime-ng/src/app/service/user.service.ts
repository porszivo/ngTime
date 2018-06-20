import {Injectable} from '@angular/core';
import {AccessService} from './access.service';
import {HttpClient} from '@angular/common/http';

/**
 * TODO: Needs refactoring
 */
@Injectable()
export class UserService {

  // TODO: Global
  private url: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private accessService: AccessService) {
  }

  getUserData(): Promise<any> {
    return this.http.get(this.url + '/user',
      // {headers: this.accessService.getTokenHeader()}
      )
      .toPromise()
      .then(data => {
        return data;
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
