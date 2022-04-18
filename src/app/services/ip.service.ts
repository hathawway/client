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
        this.setReqSearch("office")
    }

    setReqSearch(req: string) {
        this.reqSearch = req;
    }

    setId(id: string) {
        this.id = id;
    }

    getId(): string {
        return this.id;
    }

    doClick(){
        this.data = this.getIp(this.reqSearch)
        this.onClick.emit(this.data);
    }

    getIp(request: Request["request"]): Observable<Ip[]> {
        const search = {
            id: this.getId(),
            request: request
        }
        return this.http.post<Ip[]>(`${environment.api}/api/kafedra/ip/all-ip/`, search)
    }

    getIpById(ip: Ip): Observable<Ip> {
        return this.http.get<Ip>(`${environment.api}/api/kafedra/ip/${ip.id}`)
    }

    updateIp(id: string, ip: Ip[], request: Request["request"]): Observable<Ip> {
        const dataReq = {
            request: request,
            ip: ip
        }
        return this.http.patch<Ip>(`${environment.api}/api/kafedra/ip/${id}`, dataReq)
    }

    addIp(ip: Ip[], request: Request["request"]): Observable<Ip> {
        const dataReq = {
            request: request,
            ip: ip
        }
        return this.http.post<Ip>(`${environment.api}/api/kafedra/ip/`, dataReq)
    }

    deleteIp(ip: Ip, request: Request["request"]):Observable<Ip> {
        const search = {
            request: request
        }
        return this.http.post<Ip>(`${environment.api}/api/kafedra/ip/${ip.id}`, search)
    }

    




}