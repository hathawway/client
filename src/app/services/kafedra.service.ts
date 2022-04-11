import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookOffice, Kafedra, Message, User } from "../interfaces/interfaces";
import { AuthService } from "./auth";

@Injectable({
    providedIn:'root'
})

export class KafedraService {

    private data: Observable<Kafedra[]> | undefined;
    onClick:EventEmitter<Observable<Kafedra[]>> = new EventEmitter();

    constructor(private http: HttpClient, 
        private authService: AuthService) {     
    }


    doClick(){
        this.data = this.getKafedra()
        this.onClick.emit(this.data);
    }

        addKafedra(user: string[], office: BookOffice): Observable<Kafedra> {
            const kafedra = {
                user: user,
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
            return this.http.get<Kafedra[]>(`${environment.api}/api/kafedra/all/`)
        }

        // getKafedraById(kafedra: Kafedra): Observable<Kafedra> {
        //     return this.http.get<Kafedra>(`${environment.api}/api/kafedra/${kafedra.id}`)
        // }

        getKafedraByUser(): Observable<Kafedra[]> {
            return this.http.get<Kafedra[]>(`${environment.api}/api/kafedra/`)
        }


}