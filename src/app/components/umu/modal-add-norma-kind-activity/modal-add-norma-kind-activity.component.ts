import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookPost, KindActivity, NormaKindActivity } from 'src/app/interfaces/interfaces';
import { KindActivityService } from 'src/app/services/kindActivity.service';
import { NormaKindActivityService } from 'src/app/services/normaKindActivity.service';
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
  data: Observable<NormaKindActivity[]> | undefined;


  constructor(private kindActivityService : KindActivityService,
    private normaKindActivityService : NormaKindActivityService,
    private postService: PostService) {
      this.normaKindActivityService.onClick.subscribe(cnt => this.data = cnt);
     }
 
  ngOnInit(): void {
    this.posts$ = this.postService.getPost()
    this.kinds$ = this.kindActivityService.getKindActivity()
  }

  openEdit(e:MouseEvent, data:NormaKindActivity) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      norma: new FormControl(data.norma === null ? null : data.norma, Validators.required),
      idbook_post: new FormControl(data.book_post === null ? null : data.book_post.id, Validators.required),
      idkind_activity: new FormControl(data.kind_activity === null ? null : data.kind_activity.id , Validators.required)
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

    this.flag = true;
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    if (this.flag) {
      this.normaKindActivityService.addNormaKindActivity(this.form.value).subscribe(
        () => this.normaKindActivityService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
    else {
      this.normaKindActivityService.updateNormaKindActivity(this.form.value).subscribe(
        () => this.normaKindActivityService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }    
    this.form.enable()
    this.flag = false;
    this.visibility = "hidden"
    
  }

}
