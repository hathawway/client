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

        checkName(name: String){
            if (name == undefined) {
                return false
            }
            else {
                return true
            }
        }

        addWork(work: BookWork): Observable<BookWork> {
            return this.http.post<BookWork>(`${environment.api}/api/work/`, work)
        }

        updateWork(work: BookWork): Observable<BookWork> {
            return this.http.patch<BookWork>(`${environment.api}/api/work/${work.id}`, work)
        }

        deleteWork(work: BookWork):Observable<BookWork> {
            return this.http.delete<BookWork>(`${environment.api}/api/work/${work.id}`)
        }

        getWork(): Observable<BookWork[]> {
            return this.http.get<BookWork[]>(`${environment.api}/api/work/`)
        }

        getWorkById(work: BookWork): Observable<BookWork> {
            return this.http.get<BookWork>(`${environment.api}/api/work/${work.id}`)
        }
}