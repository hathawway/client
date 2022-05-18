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

    addBookUnit(data: BookUnit): Observable<void> {
        return this.http.post<void>(`${environment.api}/api/norma/book_unit/`, data)
    }

    updateBookUnit(data: BookUnit): Observable<void> {
        return this.http.patch<void>(`${environment.api}/api/norma/book_unit/${data.id}`, data)
    }

    deleteBookUnit(data: BookUnit):Observable<void> {
        return this.http.delete<void>(`${environment.api}/api/norma/book_unit/${data.id}`)
    }

    getBookUnit(): Observable<BookUnit[]> {
        return this.http.get<BookUnit[]>(`${environment.api}/api/norma/book_unit`)
    }

    getBookUnitById(data: BookUnit): Observable<BookUnit> {
        return this.http.get<BookUnit>(`${environment.api}/api/norma/book_unit/${data.id}`)
    }
}