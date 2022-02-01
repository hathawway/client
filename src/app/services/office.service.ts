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

        addOffice(office: BookOffice) {
            return this.http.get<BookOffice>(`${environment.api}/api/office/office/`)
        }


        updateOffice(office: BookOffice) {
            //return this.http.patch<Office>(`${environment.api}/api/office/:id`)
        }

        deleteOffice(id:string):Observable<BookOffice[]> {
            return this.http.delete<BookOffice[]>(`${environment.api}/api/office/${id}`)
        }

        getOfficeOne(office: BookOffice) {
            //return this.http.get<Office>(`${environment.api}/api/office/:id`)
        }

        getOffice(): Observable<BookOffice[]> {
            return this.http.get<BookOffice[]>(`${environment.api}/api/office/`)
        }

        getOfficeById(id: string): Observable<BookOffice> {
            return this.http.get<BookOffice>(`${environment.api}/api/office/${id}`)
        }
}