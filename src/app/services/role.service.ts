import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Role, Message } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class RoleService {

    private numberRole:number = 0;
    onClick:EventEmitter<number> = new EventEmitter();

    constructor(private http: HttpClient) {}

    doClick(id:number){
        this.onClick.emit(this.numberRole=id);
    }

    addRole(role: Role): Observable<void> {
        return this.http.post<void>(`${environment.api}/api/role/`, role)
    }

    updateRole(role: Role): Observable<void> {
        return this.http.patch<void>(`${environment.api}/api/role/${role.id}`, role)
    }

    deleteRole(role: Role):Observable<void> {
        return this.http.delete<void>(`${environment.api}/api/role/${role.id}`)
    }

    getRole(): Observable<Role[]> {
        return this.http.get<Role[]>(`${environment.api}/api/role/`)
    }

    getRoleById(role: Role): Observable<Role> {
        return this.http.get<Role>(`${environment.api}/api/role/${role.id}`)
    }

    getCurrentUserRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(`${environment.api}/api/role/user/`)
    }
}
