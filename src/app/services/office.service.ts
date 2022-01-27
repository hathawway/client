import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Office } from "../interfaces/interfaces";

@Injectable()

export class OfficeService {


    constructor(private http: HttpClient) {}

        checkName(name: String){
            if (name == undefined) {
                return false
            }
            else {
                return true
            }
        }

        addOffice(offce: Office) {
            return this.http.get<Office>(`${environment.api}/api/office/add-office`)
        }
}