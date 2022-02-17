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

        checkName(name: String){
            if (name == undefined) {
                return false
            }
            else {
                return true
            }
        }

        addStatus(status: BookStatus): Observable<BookStatus> {
            return this.http.post<BookStatus>(`${environment.api}/api/status/`, status)
        }

        updateStatus(status: BookStatus): Observable<BookStatus> {
            return this.http.patch<BookStatus>(`${environment.api}/api/status/${status.id}`, status)
        }

        deleteStatus(status: BookStatus):Observable<BookStatus> {
            return this.http.delete<BookStatus>(`${environment.api}/api/status/${status.id}`)
        }

        getStatus(): Observable<BookStatus[]> {
            return this.http.get<BookStatus[]>(`${environment.api}/api/status/`)
        }

        getStatusById(status: BookStatus): Observable<BookStatus> {
            return this.http.get<BookStatus>(`${environment.api}/api/status/${status.id}`)
        }
}