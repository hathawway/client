import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BookPost } from "../interfaces/interfaces";

@Injectable({
    providedIn:'root'
})

export class PostService {

    private data: Observable<BookPost[]> | undefined;
    onClick:EventEmitter<Observable<BookPost[]>> = new EventEmitter();


    constructor(private http: HttpClient) {}

        doClick(){
            this.data = this.getPost()
            this.onClick.emit(this.data);
        }

        addPost(post: BookPost): Observable<void> {
            return this.http.post<void>(`${environment.api}/api/post/`, post)
        }

        updatePost(post: BookPost): Observable<void> {
            return this.http.patch<void>(`${environment.api}/api/post/${post.id}`, post)
        }

        deletePost(post: BookPost):Observable<void> {
            return this.http.delete<void>(`${environment.api}/api/post/${post.id}`)
        }

        getPost(): Observable<BookPost[]> {
            return this.http.get<BookPost[]>(`${environment.api}/api/post`)
        }

        getPostById(post: BookPost): Observable<BookPost> {
            return this.http.get<BookPost>(`${environment.api}/api/post/${post.id}`)
        }
}