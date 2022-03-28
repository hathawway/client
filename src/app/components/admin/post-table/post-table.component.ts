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

  @ViewChild(ModalAddPostTableComponent) menu!:ModalAddPostTableComponent 
 
  term!: string;
  data: Observable<BookPost[]> | undefined;

  constructor(private postService: PostService) { 
      this.postService.onClick.subscribe(cnt=>this.data = cnt);
  }
  
    openMenuEdit(e, post:BookPost) {
      this.menu.openEdit(e, post)
    }
  
    openMenuAdd(e) {
      this.menu.openAdd(e)
    }

  ngOnInit(): void {
    this.getData();  
  }

  getData() {
    this.postService.doClick()
  }

  delete(post:BookPost) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.postService.deletePost(post).subscribe(
        () => this.getData(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
  }


}
