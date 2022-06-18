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

    addActivity(data: Activity): Observable<void> {
        return this.http.post<void>(`${environment.api}/api/norma/activity/`, data)
    }

    updateActivity(data: Activity): Observable<void> {
        return this.http.patch<void>(`${environment.api}/api/norma/activity/${data.id}`, data)
    }

    deleteActivity(data: Activity):Observable<void> {
        return this.http.delete<void>(`${environment.api}/api/norma/activity/${data.id}`)
    }

    getActivity(): Observable<Activity[]> {
        return this.http.get<Activity[]>(`${environment.api}/api/norma/activity`)
    }

    getActivityById(id: Number): Observable<Activity> {
        return this.http.get<Activity>(`${environment.api}/api/norma/activity/${id}`)
    }

    getActivitysByKindActivity(id: Number): Observable<Activity[]> {
        return this.http.get<Activity[]>(`${environment.api}/api/norma/activity/kind/${id}`)
    }
}