import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';
import { ModalAddPostTableComponent } from '../modal-add-post-table/modal-add-post-table.component';


@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css']
})
export class PostTableComponent implements OnInit {

  @ViewChild(ModalAddPostTableComponent) menu:ModalAddPostTableComponent 
 
  posts$: Observable<Post[]> | undefined

  constructor(private postService: PostService) { }
  
  openMenu(e) {
    this.menu.open(e)
  }

  ngOnInit(): void {
    this.posts$ = this.postService.getPost()
  }

  delete() {
    
  }


}
