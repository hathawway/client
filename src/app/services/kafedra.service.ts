import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookOffice, Kafedra, Message, User } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class KafedraService {

    private data: Observable<Kafedra[]> | undefined;
    onClick:EventEmitter<Observable<Kafedra[]>> = new EventEmitter();


    constructor(private http: HttpClient) {}

    doClick(){
        this.data = this.getKafedra()
        this.onClick.emit(this.data);
    }

        addKafedra(user: User, office: BookOffice): Observable<Kafedra> {
            const kafedra = {
                user: user.id,
                book_office: office.id
            }
            return this.http.post<Kafedra>(`${environment.api}/api/kafedra/`, kafedra)
        }

        updateKafedra(kafedra: Kafedra): Observable<Kafedra> {
            return this.http.patch<Kafedra>(`${environment.api}/api/kafedra/${kafedra.id}`, kafedra)
        }

        deleteKafedra(kafedra: Kafedra):Observable<Kafedra> {
            return this.http.delete<Kafedra>(`${environment.api}/api/kafedra/${kafedra.id}`)
        }

        getKafedra(): Observable<Kafedra[]> {
            return this.http.get<Kafedra[]>(`${environment.api}/api/kafedra/`)
        }

        getKafedraById(kafedra: Kafedra): Observable<Kafedra> {
            return this.http.get<Kafedra>(`${environment.api}/api/kafedra/one/${kafedra.id}`)
        }


}