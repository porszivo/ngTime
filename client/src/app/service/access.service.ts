import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccessService implements CanActivate {

  private token_name = 'access-token';
  private token = null;

  private url = 'http://localhost:3000/api';

  constructor(private http: Http, private router: Router) {
  }

  canActivate() {
    this.readToken();
    if (this.token != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  readToken() {
    const token = localStorage.getItem(this.token_name);
    if (token) {
      this.token = token;
    }
  }

  writeToken() {
    localStorage.setItem(this.token_name, this.token);
  }

  removeToken() {
    localStorage.removeItem(this.token_name);
  }

  loginUser(username: string, password: string): Promise<boolean> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + '/login', JSON.stringify({'username': username, 'password': password}), options)
      .toPromise()
      .then(result => {
        result.json();
        if(result['status'] === 200) {
          this.token = result['token'];
          this.writeToken();
          return true;
        }
        return false;
      })
      .catch(err => {
        return false;
      });
  }

  logoutUser() {
    localStorage.removeItem(this.token_name);
  }

}
