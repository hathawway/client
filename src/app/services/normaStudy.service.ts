import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { NormaStudy } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class NormaStudyService {

    private data: Observable<NormaStudy[]> | undefined; 
    onClick:EventEmitter<Observable<NormaStudy[]>> = new EventEmitter();

    constructor(private http: HttpClient) {}

    doClick(){
        this.data = this.getNormaStudy()
        this.onClick.emit(this.data);
    }

    addNormaStudy(data: NormaStudy): Observable<NormaStudy> {
        return this.http.post<NormaStudy>(`${environment.api}/api/norma/norma_study/`, data)
    }

    updateNormaStudy(data: NormaStudy): Observable<NormaStudy> {
        return this.http.patch<NormaStudy>(`${environment.api}/api/norma/norma_study/${data.id}`, data)
    }

    deleteNormaStudy(data: NormaStudy):Observable<NormaStudy> {
        return this.http.delete<NormaStudy>(`${environment.api}/api/norma/norma_study/${data.id}`)
    }

    getNormaStudy(): Observable<NormaStudy[]> {
        return this.http.get<NormaStudy[]>(`${environment.api}/api/norma/norma_study`)
    }

    getNormaStudyById(data: NormaStudy): Observable<NormaStudy> {
        return this.http.get<NormaStudy>(`${environment.api}/api/norma/norma_study/${data.id}`)
    }

}