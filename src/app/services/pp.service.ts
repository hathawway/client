import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { IpPps } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class IpPpsService {

    private data: Observable<IpPps[]> | undefined;
    onClick:EventEmitter<Observable<IpPps[]>> = new EventEmitter();


    constructor(private http: HttpClient) {}

    doClick(){
        this.data = this.getIpPps()
        this.onClick.emit(this.data);
    }

        addIpPps(ip: IpPps): Observable<IpPps> {
            return this.http.post<IpPps>(`${environment.api}/api/kafedra/pp/`, ip)
        }

        updateIpPps(ip: IpPps): Observable<IpPps> {
            return this.http.patch<IpPps>(`${environment.api}/api/kafedra/pp/${ip.id}`, ip)
        }

        deleteIpPps(ip: IpPps):Observable<IpPps> {
            return this.http.delete<IpPps>(`${environment.api}/api/kafedra/pp/${ip.id}`)
        }

        getIpPps(): Observable<IpPps[]> {
            return this.http.get<IpPps[]>(`${environment.api}/api/kafedra/pp/`)
        }

        getIpPpsById(ip: IpPps): Observable<IpPps> {
            return this.http.get<IpPps>(`${environment.api}/api/kafedra/pp/one/${ip.id}`)
        }


}