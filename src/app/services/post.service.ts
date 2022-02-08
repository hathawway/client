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

        addPost(post: BookPost): Observable<BookPost[]> {
            return this.http.post<BookPost[]>(`${environment.api}/api/post/`, post)
        }

        updatePost(post: BookPost): Observable<BookPost[]> {
            return this.http.patch<BookPost[]>(`${environment.api}/api/post/${post.id}`, post)
        }

        deletePost(post: BookPost):Observable<BookPost[]> {
            return this.http.delete<BookPost[]>(`${environment.api}/api/post/${post.id}`)
        }

        getPost(): Observable<BookPost[]> {
            return this.http.get<BookPost[]>(`${environment.api}/api/post`)
        }

        getPostById(post: BookPost): Observable<BookPost> {
            return this.http.get<BookPost>(`${environment.api}/api/post/${post.id}`)
        }
}