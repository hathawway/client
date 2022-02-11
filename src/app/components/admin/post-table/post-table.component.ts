import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookPost } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';
import { ModalAddPostTableComponent } from '../modal-add-post-table/modal-add-post-table.component';


@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css']
})
export class PostTableComponent implements OnInit {

  @ViewChild(ModalAddPostTableComponent) menu:ModalAddPostTableComponent 
 
  posts$: Observable<BookPost[]> | undefined

  constructor(private postService: PostService,
    private router: Router) { }
  
    openMenuEdit(e, post:BookPost) {
      this.menu.openEdit(e, post)
    }
  
    openMenuAdd(e) {
      this.menu.openAdd(e)
    }

  ngOnInit(): void {
    this.posts$ = this.postService.getPost()
  }

  delete(post:BookPost) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.postService.deletePost(post).subscribe(
        () => this.router.navigate(['/dashboard/admin/post/']),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
      window.location.reload()
    }
  }


}
