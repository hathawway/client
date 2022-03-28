import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Activity, NormaActivity } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class NormaActivityService {

    private data: Observable<NormaActivity[]> | undefined; 
    onClick:EventEmitter<Observable<NormaActivity[]>> = new EventEmitter();

    constructor(private http: HttpClient) {}

    doClick(){
        this.data = this.getNormaActivity()
        this.onClick.emit(this.data);
    }

    addNormaActivity(data: NormaActivity): Observable<NormaActivity> {
        return this.http.post<NormaActivity>(`${environment.api}/api/norma/norma_activity/`, data)
    }

    updateNormaActivity(data: NormaActivity): Observable<NormaActivity> {
        return this.http.patch<NormaActivity>(`${environment.api}/api/norma/norma_activity/${data.id}`, data)
    }

    deleteNormaActivity(data: NormaActivity):Observable<NormaActivity> {
        return this.http.delete<NormaActivity>(`${environment.api}/api/norma/norma_activity/${data.id}`)
    }

    getNormaActivity(): Observable<NormaActivity[]> {
        return this.http.get<NormaActivity[]>(`${environment.api}/api/norma/norma_activity`)
    }

    getNormaActivityById(data: NormaActivity): Observable<NormaActivity> {
        return this.http.get<NormaActivity>(`${environment.api}/api/norma/norma_activity/${data.id}`)
    }

    getNormaActivityByActivity(data: Activity): Observable<NormaActivity[]> {
        return this.http.get<NormaActivity[]>(`${environment.api}/api/norma/norma_activity/activity/${data.id}`)
    }

}