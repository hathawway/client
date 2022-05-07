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

    //private _offices: BookOffice[] = [];

    constructor(private http: HttpClient) {}

        doClick(){
            this.data = this.getOffice()
            this.onClick.emit(this.data);
        }
        
        // get offices() {
        //     return this._offices;
        // }

        init() {
            return this.getOffice()
        }

        addOffice(office: BookOffice): Observable<void> {
            return this.http.post<void>(`${environment.api}/api/office/`, office)
        }

        updateOffice(office: BookOffice): Observable<void> {
            return this.http.patch<void>(`${environment.api}/api/office/${office.id}`, office)
        }

        deleteOffice(office: BookOffice):Observable<void> {
            return this.http.delete<void>(`${environment.api}/api/office/${office.id}`)
        }

        getOffice(): Observable<BookOffice[]> {
            return this.http.get<BookOffice[]>(`${environment.api}/api/office/`)
        }

        getOfficeById(office: BookOffice): Observable<BookOffice> {
            return this.http.get<BookOffice>(`${environment.api}/api/office/${office.id}`)
        }
}