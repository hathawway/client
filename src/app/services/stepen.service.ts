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

        checkName(name: String){
            if (name == undefined) {
                return false
            }
            else {
                return true
            }
        }

        addStepen(stepen: BookStepen): Observable<BookStepen> {
            return this.http.post<BookStepen>(`${environment.api}/api/stepen/`, stepen)
        }

        updateStepen(stepen: BookStepen): Observable<BookStepen> {
            return this.http.patch<BookStepen>(`${environment.api}/api/stepen/${stepen.id}`, stepen)
        }

        deleteStepen(stepen: BookStepen):Observable<BookStepen> {
            return this.http.delete<BookStepen>(`${environment.api}/api/stepen/${stepen.id}`)
        }

        getStepen(): Observable<BookStepen[]> {
            return this.http.get<BookStepen[]>(`${environment.api}/api/stepen/`)
        }

        getStepenById(stepen: BookStepen): Observable<BookStepen> {
            return this.http.get<BookStepen>(`${environment.api}/api/stepen/${stepen.id}`)
        }
}