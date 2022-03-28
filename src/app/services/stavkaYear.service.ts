import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { StavkaYear } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class StavkaYearService {

    private data: Observable<StavkaYear> | undefined; 
    onClick:EventEmitter<Observable<StavkaYear>> = new EventEmitter();

    constructor(private http: HttpClient) {}

    doClick(){
        this.data = this.getStavkaYearOne()
        this.onClick.emit(this.data);
    }

    /*addStavkaYear(data: StavkaYear): Observable<StavkaYear> {
        return this.http.post<StavkaYear>(`${environment.api}/api/norma/stavka_year/`, data)
    }*/

    updateStavkaYear(data: StavkaYear): Observable<StavkaYear> {
        return this.http.patch<StavkaYear>(`${environment.api}/api/norma/stavka_year/${data.id}`, data)
    }

    /*deleteStavkaYear(data: StavkaYear):Observable<StavkaYear> {
        return this.http.delete<StavkaYear>(`${environment.api}/api/norma/stavka_year/${data.id}`)
    }

    getStavkaYear(): Observable<StavkaYear[]> {
        return this.http.get<StavkaYear[]>(`${environment.api}/api/norma/stavka_year`)
    }*/

    getStavkaYearOne(): Observable<StavkaYear> {
        return this.http.get<StavkaYear>(`${environment.api}/api/norma/stavka_year/`)
    }      

}