import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import {BookOffice, Kafedra, Request, User} from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class KafedraService {

    private data: Observable<Kafedra[]> | undefined;
    onClick:EventEmitter<Observable<Kafedra[]>> = new EventEmitter();
    private reqSearch!: Request["request"];

    constructor(private http: HttpClient) {
        this.setReqSearch("office")
    }

    setReqSearch(req: string) {
        this.reqSearch = req;
    }

    getReqSearch(): string {
        return this.reqSearch;
    }

    doClick() {
        this.data = this.getKafedra(this.reqSearch)
        this.onClick.emit(this.data);
    }

    addKafedra(user: string[], office: BookOffice): Observable<void> {
        const kafedra = {
            userIds: user,
            book_office: office.id
        }
        return this.http.post<void>(`${environment.api}/api/kafedra/`, kafedra)
    }

    updateKafedra(kafedra: Kafedra): Observable<void> {
        return this.http.patch<void>(`${environment.api}/api/kafedra/${kafedra.id}`, kafedra)
    }

    deleteKafedra(kafedra: Kafedra):Observable<void> {
        return this.http.delete<void>(`${environment.api}/api/kafedra/${kafedra.id}`)
    }

    getKafedra(request: Request["request"]): Observable<Kafedra[]> {
        const search = {
            request: request
        }
        return this.http.post<Kafedra[]>(`${environment.api}/api/kafedra/all/`, search)
    }

    getKafedraById(kafedra: Kafedra): Observable<Kafedra> {
        return this.http.get<Kafedra>(`${environment.api}/api/kafedra/${kafedra.id}`)
    }

}
