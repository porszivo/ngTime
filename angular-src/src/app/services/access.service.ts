import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable()
export class AccessService implements CanActivate {

    private tokenName = 'token';
    private token = null;

    private headers = new Headers({'Content-Type': 'application/json'});

    private url = 'http://localhost:3000/users';

    constructor(private http: HttpClient, private router: Router) {
    }

    canActivate(): boolean {
        this.readToken();
        if (this.token != null) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    readToken(): void {
        const token = localStorage.getItem(this.tokenName);
        if (token) {
            this.token = token;
        }
    }

    setToken(token: string): void {
        this.token = token;
        localStorage.setItem(this.tokenName, this.token);
        this.router.navigate(['/usercp']);
    }

    getTokenHeader(): Headers {
        if (this.token == null) {
            return null;
        }
        this.headers.append(this.tokenName, this.token);
        return this.headers;

    }

    loginUser(user: User): Observable<any> {
        return this.http.post(`${this.url}/login`, user);
    }

    registerUser(user: User): Observable<any> {
        return this.http.post(`${this.url}/register`, user);
    }

    logoutUser(): void {
        localStorage.removeItem(this.tokenName);
        this.token = null;
    }

}
