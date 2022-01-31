import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookPost } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class PostService {


    constructor(private http: HttpClient) {}

        checkName(name: String){
            if (name == undefined) {
                return false
            }
            else {
                return true
            }
        }

        addPost(post: BookPost) {
            //return this.http.post<Post>(`${environment.api}/api/post/`)
        }

        updatePost(post: BookPost) {
            //return this.http.patch<Post>(`${environment.api}/api/post/:id`)
        }

        deletePost(id: number | string) {
            /*return this.http.delete(`${environment.api}/api/post/:id`, {
                params: new HttpParams().set(`id`, id)
            })*/
        }

        getPostOne(id: number | string) {
            /*return this.http.get<Post[]>(`${environment.api}/api/post/:id`, {
                params: new HttpParams().set('id', id)
            })*/
        }

        getPost(): Observable<BookPost[]> {
            return this.http.get<BookPost[]>(`${environment.api}/api/post/`)
        }
}