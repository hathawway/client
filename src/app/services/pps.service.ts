import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Ip } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class IpPpsService {

    private data: Observable<Ip[]> | undefined;
    onClick:EventEmitter<Observable<Ip[]>> = new EventEmitter();


    constructor(private http: HttpClient) {}

    doClick(){
        this.data = this.getIpPps()
        this.onClick.emit(this.data);
    }

    addIp(ip: Ip): Observable<Ip> {
        return this.http.post<Ip>(`${environment.api}/api/kafedra/ip/`, ip)
    }

    deleteIp(ip: Ip):Observable<Ip> {
        return this.http.delete<Ip>(`${environment.api}/api/kafedra/ip/${ip.id}`)
    }

    updateIpPps(ip: Ip): Observable<Ip> {
        return this.http.patch<Ip>(`${environment.api}/api/kafedra/ip/pps/${ip.id}`, ip)
    }

    getIpPps(): Observable<Ip[]> {
        return this.http.get<Ip[]>(`${environment.api}/api/kafedra/ip/pps`)
    }

    // getIpKafedraById(ip: Ip): Observable<Ip> {
    //     return this.http.get<Ip>(`${environment.api}/api/kafedra/ip/one/${ip.id}`)
    // }


}