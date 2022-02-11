import { Component, OnInit, HostBinding, HostListener, Input  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  of !: BookPost ;
  flag = false;
  
  constructor(private postService : PostService,
    private router: Router,
    private route: ActivatedRoute) { }
 
  ngOnInit(): void {

  }

  openEdit(e:MouseEvent, post:BookPost) { 
    this.visibility = "visible"
    this.postForm = new FormGroup({
      id: new FormControl(post.id, Validators.required),
      name: new FormControl(post.name, Validators.required)
    })
    e.stopPropagation()    
  }

  openAdd(e:MouseEvent) { 
    this.visibility = "visible"
    this.postForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required)
    })
    this.flag = !this.flag
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.postForm.disable()
    if (this.flag) {
      this.postService.addPost(this.postForm.value).subscribe(
        () => this.router.navigate(['/dashboard/admin/post/']),
        error => {
          MaterialService.toast(error.error.message)
          this.postForm.enable()
        }
      )
    }
    else {
      this.postService.updatePost(this.postForm.value).subscribe(
        () => this.router.navigate(['/dashboard/admin/post/']),
        error => {
          MaterialService.toast(error.error.message)
          this.postForm.enable()
        }
      )
    }            
    this.visibility = "hidden"
    window.location.reload()
    
  }

}
