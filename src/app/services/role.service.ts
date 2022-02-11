import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookRole, Message } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class RoleService {


    constructor(private http: HttpClient) {}

        checkName(name: String){
            if (name == undefined) {
                return false
            }
            else {
                return true
            }
        }

        addRole(role: BookRole): Observable<BookRole> {
            return this.http.post<BookRole>(`${environment.api}/api/role/`, role)
        }

        updateRole(role: BookRole): Observable<BookRole> {
            return this.http.patch<BookRole>(`${environment.api}/api/role/${role.id}`, role)
        }

        deleteRole(role: BookRole):Observable<BookRole> {
            return this.http.delete<BookRole>(`${environment.api}/api/role/${role.id}`)
        }

        getRole(): Observable<BookRole[]> {
            return this.http.get<BookRole[]>(`${environment.api}/api/role/`)
        }

        getRoleById(role: BookRole): Observable<BookRole> {
            return this.http.get<BookRole>(`${environment.api}/api/role/${role.id}`)
        }
}