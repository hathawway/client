import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookZvanie } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class ZvanieService {


    constructor(private http: HttpClient) {}

        // addZvanie(zvanie: BookZvanie): Observable<void> {
        //     return this.http.post<void>(`${environment.api}/api/zvanie/`, zvanie)
        // }

        // updateZvanie(zvanie: BookZvanie): Observable<void> {
        //     return this.http.patch<void>(`${environment.api}/api/zvanie/${zvanie.id}`, zvanie)
        // }

        // deleteZvanie(zvanie: BookZvanie):Observable<void> {
        //     return this.http.delete<void>(`${environment.api}/api/zvanie/${zvanie.id}`)
        // }

        getZvanie(): Observable<BookZvanie[]> {
            return this.http.get<BookZvanie[]>(`${environment.api}/api/zvanie/`)
        }

        getZvanieById(zvanie: BookZvanie): Observable<BookZvanie> {
            return this.http.get<BookZvanie>(`${environment.api}/api/zvanie/${zvanie.id}`)
        }
}