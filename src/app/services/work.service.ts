import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookWork, Message } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class WorkService {


    constructor(private http: HttpClient) {}

        // addWork(work: BookWork): Observable<void> {
        //     return this.http.post<void>(`${environment.api}/api/work/`, work)
        // }

        // updateWork(work: BookWork): Observable<void> {
        //     return this.http.patch<void>(`${environment.api}/api/work/${work.id}`, work)
        // }

        // deleteWork(work: BookWork):Observable<void> {
        //     return this.http.delete<void>(`${environment.api}/api/work/${work.id}`)
        // }

        getWork(): Observable<BookWork[]> {
            return this.http.get<BookWork[]>(`${environment.api}/api/work/`)
        }

        getWorkById(work: BookWork): Observable<BookWork> {
            return this.http.get<BookWork>(`${environment.api}/api/work/${work.id}`)
        }
}