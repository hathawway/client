import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Activity } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class ActivityService {

    private data: Observable<Activity[]> | undefined; 
    onClick:EventEmitter<Observable<Activity[]>> = new EventEmitter();

    constructor(private http: HttpClient) {}

    doClick(){
        this.data = this.getActivity()
        this.onClick.emit(this.data);
    }

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
}