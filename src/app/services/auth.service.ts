import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {User} from "../interfaces/interfaces";
import {Observable} from "rxjs";
import {tap, map} from 'rxjs/operators';

import { Role } from '../guards/roles';
import {Role as roleData}  from "../interfaces/interfaces";


import {environment} from "src/environments/environment.prod";
import {RoleService} from "./role.service";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private token: string = '';

    private data: Observable<User[]> | undefined;
    onClick:EventEmitter<Observable<User[]>> = new EventEmitter();

    constructor(private http: HttpClient, private role: RoleService) {}

    doClick(){
      this.data = this.getUser()
      this.onClick.emit(this.data);
    }

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

    register(user: User): Observable<void> {
      return this.http.post<void>(`${environment.api}/api/user/register`, user)
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

    updateUser(user: User): Observable<void> {
        return this.http.patch<void>(`${environment.api}/api/user/${user.id}`, user)
    }

    deleteUser(user: User):Observable<void> {
        return this.http.delete<void>(`${environment.api}/api/user/${user.id}`)
    }

    getUser(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.api}/api/user/get-user-all`)
    }

    getUserById(user: User): Observable<User> {
        return this.http.get<User>(`${environment.api}/api/user/get-user-one/${user.id}`)
    }

    getUserByHeader(): Observable<User> {
      return this.http.get<User>(`${environment.api}/api/user/name/`)
  }

    getCurrentUserRoles() : Observable<Array<number>> {
      return this.role.getCurrentUserRoles().pipe(map((data: roleData[])=>{
        let out = new Array<number>()
        for (const dataKey in data) {
          out.push(data[dataKey].id);
        }
        return out
      }))
    }
}
