import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Ip, IpPps, Request } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class IpPpsService {

    private data: Observable<IpPps[]> | undefined;
    onClick:EventEmitter<Observable<IpPps[]>> = new EventEmitter();
    //private reqSearch!: Request["request"];

    id!: string;

    constructor(private http: HttpClient) {
        //this.setReqSearch("office")
    }

    // setReqSearch(req: string) {
    //     this.reqSearch = req;
    // }

    setId(id: string) {
        this.id = id;
    }

    getId(): string {
        return this.id;
    }

    doClick(){
        //this.data = this.getIp(this.reqSearch)
        this.data = this.getIpPps(this.id)
        this.onClick.emit(this.data);
    }

    getIpPps(id: string): Observable<IpPps[]> | undefined {
        const search = {
            // id: this.getId(),
            // request: request
        }
        if (id === "") { return }
        return this.http.get<IpPps[]>(`${environment.api}/api/ip/ip-pps/all/${id}`)
    }

    updateIpPps(ip: IpPps): Observable<void> {
        // const dataReq = {
        //     request: request,
        //     ip: ip
        // }
        return this.http.patch<void>(`${environment.api}/api/ip/ip-pps/${ip.id}`, ip)
    }

    deleteIpPps(ip: IpPps):Observable<void> {
        // const search = {
        //     request: request
        // }
        return this.http.delete<void>(`${environment.api}/api/ip/ip-pps/${ip.id}`)
    }

    addIpPps(ip: Ip): Observable<void> {
        // const dataReq = {
        //     request: request,
        //     ip: ip
        // }
        return this.http.post<void>(`${environment.api}/api/ip/ip-pps/`, ip)
    }

    // getIp(request: Request["request"]): Observable<Ip[]> {
    //     const search = {
    //         id: this.getId(),
    //         request: request
    //     }
    //     return this.http.post<Ip[]>(`${environment.api}/api/kafedra/ip/all-ip/`, search)
    // }

    // getIpById(ip: Ip): Observable<Ip> {
    //     return this.http.get<Ip>(`${environment.api}/api/kafedra/ip/${ip.id}`)
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
