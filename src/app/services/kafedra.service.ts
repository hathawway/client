import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookOffice, Kafedra, Message, User } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class KafedraService {


    constructor(private http: HttpClient) {}

        // checkName(name: String){
        //     if (name == undefined) {
        //         return false
        //     }
        //     else {
        //         return true
        //     }
        // }

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

        getKafedra(user: User): Observable<Kafedra[]> {
            return this.http.get<Kafedra[]>(`${environment.api}/api/kafedra/${user.book_office.id}`)
        }


}