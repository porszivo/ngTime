import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class AccessService implements CanActivate {

    private token_name = 'token';
    private token = null;

    private headers = new Headers({'Content-Type': 'application/json'});

    private url = 'http://localhost:3000/users';

    constructor(private http: HttpClient, private router: Router) {
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

    readToken(): void {
        const token = localStorage.getItem(this.token_name);
        if (token) {
            this.token = token;
        }
    }

    getTokenHeader(): Headers {

        if (this.token == null) {
            return null;
        }
        this.headers.append(this.token_name, this.token);
        return this.headers;

    }

    writeToken() {
        localStorage.setItem(this.token_name, this.token);
    }

    removeToken() {
        localStorage.removeItem(this.token_name);
        this.token = null;
    }

    loginUser(username: string, password: string): Subscription {
        return null;
    }

    registerUser(user: User): Observable<any> {
        return this.http.post(`${this.url}/register`, user);
    }

    logoutUser() {
    }

}
