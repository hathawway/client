import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { KindActivity } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class KindActivityService {

    private data: Observable<KindActivity[]> | undefined; 
    onClick:EventEmitter<Observable<KindActivity[]>> = new EventEmitter();

    constructor(private http: HttpClient) {}

    doClick(){
        this.data = this.getKindActivity()
        this.onClick.emit(this.data);
    }

    addKindActivity(data: KindActivity): Observable<KindActivity> {
        return this.http.post<KindActivity>(`${environment.api}/api/norma/kind_activity/`, data)
    }

    updateKindActivity(data: KindActivity): Observable<KindActivity> {
        return this.http.patch<KindActivity>(`${environment.api}/api/norma/kind_activity/${data.id}`, data)
    }

    deleteKindActivity(data: KindActivity):Observable<KindActivity> {
        return this.http.delete<KindActivity>(`${environment.api}/api/norma/kind_activity/${data.id}`)
    }

    getKindActivity(): Observable<KindActivity[]> {
        return this.http.get<KindActivity[]>(`${environment.api}/api/norma/kind_activity`)
    }

    getKindActivityById(data: KindActivity): Observable<KindActivity> {
        return this.http.get<KindActivity>(`${environment.api}/api/norma/kind_activity/${data.id}`)
    }
}