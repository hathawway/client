import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookZvanie, Message } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class ZvanieService {


    constructor(private http: HttpClient) {}

        checkName(name: String){
            if (name == undefined) {
                return false
            }
            else {
                return true
            }
        }

        addZvanie(zvanie: BookZvanie): Observable<BookZvanie> {
            return this.http.post<BookZvanie>(`${environment.api}/api/zvanie/`, zvanie)
        }

        updateZvanie(zvanie: BookZvanie): Observable<BookZvanie> {
            return this.http.patch<BookZvanie>(`${environment.api}/api/zvanie/${zvanie.id}`, zvanie)
        }

        deleteZvanie(zvanie: BookZvanie):Observable<BookZvanie> {
            return this.http.delete<BookZvanie>(`${environment.api}/api/zvanie/${zvanie.id}`)
        }

        getZvanie(): Observable<BookZvanie[]> {
            return this.http.get<BookZvanie[]>(`${environment.api}/api/zvanie/`)
        }

        getZvanieById(zvanie: BookZvanie): Observable<BookZvanie> {
            return this.http.get<BookZvanie>(`${environment.api}/api/zvanie/${zvanie.id}`)
        }
}