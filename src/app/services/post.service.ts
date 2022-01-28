import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Post } from "../interfaces/interfaces";

@Injectable()

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

        addPost(post: Post) {
            //return this.http.post<Post>(`${environment.api}/api/post/`)
        }

        updatePost(post: Post) {
            //return this.http.patch<Post>(`${environment.api}/api/post/:id`)
        }

        deletePost(id: number | string) {
            return this.http.delete(`${environment.api}/api/post/:id`, {
                params: new HttpParams().set(`id`, id)
            })
        }

        getPostOne(id: number | string): Observable<Post[]> {
            return this.http.get<Post[]>(`${environment.api}/api/post/:id`, {
                params: new HttpParams().set('id', id)
            })
        }

        getPost(): Observable<Post[]> {
            return this.http.get<Post[]>(`${environment.api}/api/post/`)
        }
}