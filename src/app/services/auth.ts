import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "../interfaces/interfaces";
import { Roles } from "../interfaces/interfaces";
import { BehaviorSubject, Observable } from "rxjs";
import { tap, map } from 'rxjs/operators';

import {environment} from "src/environments/environment.prod";
import { ResolveStart } from "@angular/router";

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

    /*register(user: User): Observable<User> {
      return this.http.post<{token:string}>(`${environment.api}/api/user/register`, user).
        pipe(
          tap(
            ({ token}) => {
              localStorage.setItem('auth-token', token)
              this.setToken(token)
            }
          )
        );
    }*/    

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

    // на бэке метода такого нет
    updateUser(user: User): Observable<User> {
        return this.http.patch<User>(`${environment.api}/api/user/${user.id}`, user)
    }

    deleteUser(user: User):Observable<User> {
        return this.http.delete<User>(`${environment.api}/api/user/${user.id}`)
    }

    getUser(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.api}/api/user/get-user-all`)
    }

    getUserById(user: User): Observable<User> {
        return this.http.get<User>(`${environment.api}/api/user/get-user-one/${user.id}`)
    }
   
}
