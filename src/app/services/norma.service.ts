import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { StavkaYear } from "../interfaces/interfaces";
import { NormaActivity } from "../interfaces/interfaces";
import { KindActivity } from "../interfaces/interfaces";
import { Activity } from "../interfaces/interfaces";
import { NormaStudy } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class NormaService {


    constructor(private http: HttpClient) {}

    // stavka_year

    addStavkaYear(data: StavkaYear): Observable<StavkaYear> {
        return this.http.post<StavkaYear>(`${environment.api}/api/norma/stavka_year/`, data)
    }

    updateStavkaYear(data: StavkaYear): Observable<StavkaYear> {
        return this.http.patch<StavkaYear>(`${environment.api}/api/norma/stavka_year/${data.id}`, data)
    }

    deleteStavkaYear(data: StavkaYear):Observable<StavkaYear> {
        return this.http.delete<StavkaYear>(`${environment.api}/api/norma/stavka_year/${data.id}`)
    }

    getStavkaYear(): Observable<StavkaYear[]> {
        return this.http.get<StavkaYear[]>(`${environment.api}/api/norma/stavka_year`)
    }

    getStavkaYearById(data: StavkaYear): Observable<StavkaYear> {
        return this.http.get<StavkaYear>(`${environment.api}/api/norma/stavka_year/${data.id}`)
    }    

    // norma_activity

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

    // norma_study

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

    // activity

    addActivity(data: Activity): Observable<Activity> {
        return this.http.post<Activity>(`${environment.api}/api/norma/activity/`, data)
    }

    updateActivity(data: Activity): Observable<Activity> {
        return this.http.patch<Activity>(`${environment.api}/api/norma/activity/${data.id}`, data)
    }

    deleteActivity(data: Activity):Observable<Activity> {
        return this.http.delete<Activity>(`${environment.api}/api/norma/activity/${data.id}`)
    }

    getActivity(): Observable<Activity[]> {
        return this.http.get<Activity[]>(`${environment.api}/api/norma/activity`)
    }

    getActivityById(data: Activity): Observable<Activity> {
        return this.http.get<Activity>(`${environment.api}/api/norma/activity/${data.id}`)
    }

    // activity

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