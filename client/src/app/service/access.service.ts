import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccessService implements CanActivate {

  private token_name = 'token';
  private token = null;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

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

  getTokenHeader(): Headers {

    if (this.token == null) {
      return null;
    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append(this.token_name, this.token);
    return headers;

  }

  writeToken() {
    localStorage.setItem(this.token_name, this.token);
  }

  removeToken() {
    localStorage.removeItem(this.token_name);
    this.token = null;
  }

  loginUser(username: string, password: string): Promise<boolean> {

    return this.http.post(this.url + '/login', JSON.stringify({'username': username, 'password': password}), this.options)
      .toPromise()
      .then(result => {
        if(result['status'] === 200 && result.json().token) {
          this.token = result.json().token;
          this.writeToken();
          return true;
        }
        return false;
      })
      .catch(err => {
        console.log(err.message);
        return false;
      });
  }

  registerUser(username: string, password: string, email: string): Promise<boolean> {

    return this.http.post(this.url + '/user', JSON.stringify({'username': username, 'password': password, 'email': email}), this.options)
      .toPromise()
      .then(result => {
        result.json();
        return result['status'] === 200;
      })
      .catch(err => {
        return err;
      });

  }

  logoutUser() {
    this.http.post(this.url + "/logout", {}, {headers: this.getTokenHeader()})
      .toPromise()
      .then(res => {
        if (res['status'] === 200) {
          this.removeToken();
          return true;
        }
        return false;
      });
  }

}
