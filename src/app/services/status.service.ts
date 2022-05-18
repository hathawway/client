import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookStatus, Message } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class StatusService {


    constructor(private http: HttpClient) {}

        // addStatus(status: BookStatus): Observable<void> {
        //     return this.http.post<void>(`${environment.api}/api/status/`, status)
        // }

        // updateStatus(status: BookStatus): Observable<void> {
        //     return this.http.patch<void>(`${environment.api}/api/status/${status.id}`, status)
        // }

        // deleteStatus(status: BookStatus):Observable<void> {
        //     return this.http.delete<void>(`${environment.api}/api/status/${status.id}`)
        // }

        getStatus(): Observable<BookStatus[]> {
            return this.http.get<BookStatus[]>(`${environment.api}/api/status/`)
        }

        getStatusById(status: BookStatus): Observable<BookStatus> {
            return this.http.get<BookStatus>(`${environment.api}/api/status/${status.id}`)
        }
}