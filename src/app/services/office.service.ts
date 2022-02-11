import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookOffice, Message } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class OfficeService {


    constructor(private http: HttpClient) {}

        checkName(name: String){
            if (name == undefined) {
                return false
            }
            else {
                return true
            }
        }

        addOffice(office: BookOffice): Observable<BookOffice> {
            return this.http.post<BookOffice>(`${environment.api}/api/office/`, office)
        }

        updateOffice(office: BookOffice): Observable<BookOffice> {
            return this.http.patch<BookOffice>(`${environment.api}/api/office/${office.id}`, office)
        }

        deleteOffice(office: BookOffice):Observable<BookOffice> {
            return this.http.delete<BookOffice>(`${environment.api}/api/office/${office.id}`)
        }

        getOffice(): Observable<BookOffice[]> {
            return this.http.get<BookOffice[]>(`${environment.api}/api/office/`)
        }

        getOfficeById(office: BookOffice): Observable<BookOffice> {
            return this.http.get<BookOffice>(`${environment.api}/api/office/${office.id}`)
        }
}