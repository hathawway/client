import { Component, OnInit, HostBinding, Input  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookPost } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-modal-add-post-table',
  templateUrl: './modal-add-post-table.component.html',
  styleUrls: ['./modal-add-post-table.component.css']
})
export class ModalAddPostTableComponent implements OnInit {
  
  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  postForm!: FormGroup;
  flag = false;
  data: Observable<BookPost[]> | undefined;
  
  constructor(private postService : PostService) {
    this.postService.onClick.subscribe(cnt => this.data = cnt);
  }
 
  ngOnInit(): void {

  }

  openEdit(e:MouseEvent, post:BookPost) { 
    this.visibility = "visible"
    this.postForm = new FormGroup({
      id: new FormControl(post.id, Validators.required),
      name: new FormControl(post.name, Validators.required),
      ispps: new FormControl(post.ispps, Validators.required)
    })
    e.stopPropagation()    
  }

  openAdd(e:MouseEvent) { 
    this.visibility = "visible"
    this.postForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      ispps: new FormControl(null, Validators.required)
    })
    this.flag = true;
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.postForm.disable()
    if (this.flag) {
      this.postService.addPost(this.postForm.value).subscribe(
        () => this.postService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
    else {
      this.postService.updatePost(this.postForm.value).subscribe(
        () => this.postService.doClick(),
        error => {
          MaterialService.toast(error.error.message)

        }
      )
    }    
    this.postForm.enable()
    this.flag = false;
    this.visibility = "hidden"
    
  }

}
