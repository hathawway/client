import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookOffice, Message } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class OfficeService {

    private data: Observable<BookOffice[]> | undefined;
    onClick:EventEmitter<Observable<BookOffice[]>> = new EventEmitter();

    constructor(private http: HttpClient) {}

        // checkName(name: String){
        //     if (name == undefined) {
        //         return false
        //     }
        //     else {
        //         return true
        //     }
        // }

        doClick(){
            this.data = this.getOffice()
            this.onClick.emit(this.data);
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