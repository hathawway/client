import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookOffice, Kafedra, IpKafedra, User } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class IpKafedraService {

    private data: Observable<IpKafedra[]> | undefined;
    onClick:EventEmitter<Observable<IpKafedra[]>> = new EventEmitter();


    constructor(private http: HttpClient) {}

    doClick(){
        this.data = this.getIpKafedra()
        this.onClick.emit(this.data);
    }


    updateIpKafedra(ip: IpKafedra): Observable<IpKafedra> {
        return this.http.patch<IpKafedra>(`${environment.api}/api/kafedra/ip/${ip.id}`, ip)
    }

    getIpKafedra(): Observable<IpKafedra[]> {
        return this.http.get<IpKafedra[]>(`${environment.api}/api/kafedra/ip/`)
    }

    getIpKafedraById(ip: IpKafedra): Observable<IpKafedra> {
        return this.http.get<IpKafedra>(`${environment.api}/api/kafedra/ip/one/${ip.id}`)
    }


}