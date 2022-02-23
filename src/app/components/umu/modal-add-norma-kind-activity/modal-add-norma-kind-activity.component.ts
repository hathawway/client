import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookPost, KindActivity, NormaKindActivity } from 'src/app/interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-modal-add-norma-kind-activity',
  templateUrl: './modal-add-norma-kind-activity.component.html',
  styleUrls: ['./modal-add-norma-kind-activity.component.css']
})
export class ModalAddNormaKindActivityComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;
  posts$: Observable<BookPost[]> | undefined;
  kinds$: Observable<KindActivity[]> | undefined;

  constructor(private normaService : NormaService,
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.posts$ = this.postService.getPost()
    this.kinds$ = this.normaService.getKindActivity()
  }

  openEdit(e:MouseEvent, data:NormaKindActivity) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      norma: new FormControl(data.norma, Validators.required),
      idbook_post: new FormControl(data.book_post.id, Validators.required),
      idkind_activity: new FormControl(data.kind_activity.id, Validators.required)
    })
    e.stopPropagation()    
  }

  openAdd(e:MouseEvent) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      norma: new FormControl(null, Validators.required),
      idbook_post: new FormControl(null, Validators.required),
      idkind_activity: new FormControl(null, Validators.required)
    })

    this.flag = !this.flag
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    if (this.flag) {
      this.normaService.addNormaKindActivity(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/norma-kind-activity/']),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }
    else {
      this.normaService.updateNormaKindActivity(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/norma-kind-activity/']),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }    
    this.visibility = "hidden"
    window.location.reload()
    
  }

}
