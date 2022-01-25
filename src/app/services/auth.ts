import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "../interfaces/interfaces";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

import {environment} from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root'
})

export class Auth {

    private token: string = '';

    constructor(private http: HttpClient) {}

    rsaKey() : Observable<{key: string}> {
      return this.http.get<{key:string}>(`${environment.api}/api/user/rsa-key`).
      pipe(
        tap(
          ({key}) => { return key;}
        )
      );
    }

    login(user: User): Observable<{token: string}> {
      return this.http.post<{token:string}>(`${environment.api}/api/user/login`, user).
        pipe(
          tap(
            ({token}) => {
              localStorage.setItem('auth-token', token)
              this.setToken(token)
            }
          )
        );
    }

    setToken(token: string): void {
        this.token = token;
    }

    getToken(): string {
        return this.token
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    logout() {
        this.setToken('')
        localStorage.clear()
    }


}