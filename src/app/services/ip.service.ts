import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Ip } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class IpService {

    private data: Observable<Ip[]> | undefined;
    onClick:EventEmitter<Observable<Ip[]>> = new EventEmitter();


    constructor(private http: HttpClient) {}

    doClick(){
        this.data = this.getIpKafedra()
        this.onClick.emit(this.data);
    }

    getIpKafedra(): Observable<Ip[]> {
        return this.http.get<Ip[]>(`${environment.api}/api/kafedra/ip/kafedra/`)
    }

    // getIpKafedraById(ip: Ip): Observable<Ip> {
    //     return this.http.get<Ip>(`${environment.api}/api/kafedra/ip/one/${ip.id}`)
    // }

    updateIpKafedra(ip: Ip): Observable<Ip> {
        return this.http.patch<Ip>(`${environment.api}/api/kafedra/ip/${ip.id}`, ip)
    }



}