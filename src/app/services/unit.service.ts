import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookUnit } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class UnitService {

    private data: Observable<BookUnit[]> | undefined; 
    onClick:EventEmitter<Observable<BookUnit[]>> = new EventEmitter();

    constructor(private http: HttpClient) {}

    doClick(){
        this.data = this.getBookUnit()
        this.onClick.emit(this.data);
    }

    addBookUnit(data: BookUnit): Observable<BookUnit> {
        return this.http.post<BookUnit>(`${environment.api}/api/norma/book_unit/`, data)
    }

    updateBookUnit(data: BookUnit): Observable<BookUnit> {
        return this.http.patch<BookUnit>(`${environment.api}/api/norma/book_unit/${data.id}`, data)
    }

    deleteBookUnit(data: BookUnit):Observable<BookUnit> {
        return this.http.delete<BookUnit>(`${environment.api}/api/norma/book_unit/${data.id}`)
    }

    getBookUnit(): Observable<BookUnit[]> {
        return this.http.get<BookUnit[]>(`${environment.api}/api/norma/book_unit`)
    }

    getBookUnitById(data: BookUnit): Observable<BookUnit> {
        return this.http.get<BookUnit>(`${environment.api}/api/norma/book_unit/${data.id}`)
    }
}