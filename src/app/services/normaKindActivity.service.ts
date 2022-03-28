import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { NormaKindActivity } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class NormaKindActivityService {

    private data: Observable<NormaKindActivity[]> | undefined; 
    onClick:EventEmitter<Observable<NormaKindActivity[]>> = new EventEmitter();

    constructor(private http: HttpClient) {}

    doClick(){
        this.data = this.getNormaKindActivity()
        this.onClick.emit(this.data);
    }

    addNormaKindActivity(data: NormaKindActivity): Observable<NormaKindActivity> {
        return this.http.post<NormaKindActivity>(`${environment.api}/api/norma/norma_kind_activity/`, data)
    }

    updateNormaKindActivity(data: NormaKindActivity): Observable<NormaKindActivity> {
        return this.http.patch<NormaKindActivity>(`${environment.api}/api/norma/norma_kind_activity/${data.id}`, data)
    }

    deleteNormaKindActivity(data: NormaKindActivity):Observable<NormaKindActivity> {
        return this.http.delete<NormaKindActivity>(`${environment.api}/api/norma/norma_kind_activity/${data.id}`)
    }

    getNormaKindActivity(): Observable<NormaKindActivity[]> {
        return this.http.get<NormaKindActivity[]>(`${environment.api}/api/norma/norma_kind_activity`)
    }

    getNormaKindActivityById(data: NormaKindActivity): Observable<NormaKindActivity> {
        return this.http.get<NormaKindActivity>(`${environment.api}/api/norma/norma_kind_activity/${data.id}`)
    }
}