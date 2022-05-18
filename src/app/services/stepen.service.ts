import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookStepen, Message } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class StepenService {


    constructor(private http: HttpClient) {}

        // addStepen(stepen: BookStepen): Observable<void> {
        //     return this.http.post<void>(`${environment.api}/api/stepen/`, stepen)
        // }

        // updateStepen(stepen: BookStepen): Observable<void> {
        //     return this.http.patch<void>(`${environment.api}/api/stepen/${stepen.id}`, stepen)
        // }

        // deleteStepen(stepen: BookStepen):Observable<void> {
        //     return this.http.delete<void>(`${environment.api}/api/stepen/${stepen.id}`)
        // }

        getStepen(): Observable<BookStepen[]> {
            return this.http.get<BookStepen[]>(`${environment.api}/api/stepen/`)
        }

        getStepenById(stepen: BookStepen): Observable<BookStepen> {
            return this.http.get<BookStepen>(`${environment.api}/api/stepen/${stepen.id}`)
        }
}