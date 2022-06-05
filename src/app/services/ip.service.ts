import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Ip, Request } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class IpService {

    private data: Observable<Ip[]> | undefined;
    onClick:EventEmitter<Observable<Ip[]>> = new EventEmitter();
    private reqSearch!: Request["request"];

    id!: string;

    constructor(private http: HttpClient) {
        this.setReqSearch("user")
    }

    setReqSearch(req: string) {
        this.reqSearch = req;
    }

    getReqSearch() : string {
        return this.reqSearch;
    }

    doClick(){
        this.data = this.getIp(this.reqSearch)
        //this.data = this.getIp()
        this.onClick.emit(this.data);
    }

    getIp(request: Request["request"]): Observable<Ip[]> {
        const search = {
            //id: this.getId(),
            request: request
        }
        return this.http.post<Ip[]>(`${environment.api}/api/ip/all/`, search)
    }

    updateIp(ip: Ip): Observable<void> {
        return this.http.patch<void>(`${environment.api}/api/ip/${ip.id}`, ip)
    }

    deleteIp(ip: Ip):Observable<void> {
        // const search = {
        //     request: request
        // }
        return this.http.delete<void>(`${environment.api}/api/ip/${ip.id}`)
    }

    addIp(ip: Ip): Observable<Ip> {
        return this.http.post<Ip>(`${environment.api}/api/ip/`, ip)
    }

    getIpById(id: string): Observable<Ip> {
        return this.http.get<Ip>(`${environment.api}/api/ip/${id}`)
    }

    // getIp(request: Request["request"]): Observable<Ip[]> {
    //     const search = {
    //         id: this.getId(),
    //         request: request
    //     }
    //     return this.http.post<Ip[]>(`${environment.api}/api/kafedra/ip/all-ip/`, search)
    // }


    // updateIp(id: string, ip: Ip[], request: Request["request"]): Observable<Ip> {
    //     const dataReq = {
    //         request: request,
    //         ip: ip
    //     }
    //     return this.http.patch<Ip>(`${environment.api}/api/kafedra/ip/${id}`, dataReq)
    // }

    // addIp(ip: Ip[], request: Request["request"]): Observable<Ip> {
    //     const dataReq = {
    //         request: request,
    //         ip: ip
    //     }
    //     return this.http.post<Ip>(`${environment.api}/api/kafedra/ip/`, dataReq)
    // }

    // deleteIp(ip: Ip, request: Request["request"]):Observable<Ip> {
    //     const search = {
    //         request: request
    //     }
    //     return this.http.post<Ip>(`${environment.api}/api/kafedra/ip/${ip.id}`, search)
    // }






}
