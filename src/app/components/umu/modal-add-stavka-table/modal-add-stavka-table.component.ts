import { Component, OnInit, HostBinding, HostListener, Input   } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookPost, NormaStudy } from 'src/app/interfaces/interfaces';
import { NormaStudyService } from 'src/app/services/normaStudy.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-modal-add-stavka-table',
  templateUrl: './modal-add-stavka-table.component.html',
  styleUrls: ['./modal-add-stavka-table.component.css']
})
export class ModalAddStavkaTableComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;
  posts$: Observable<BookPost[]> | undefined;

  data: Observable<NormaStudy[]> | undefined;


  constructor(private normaService : NormaStudyService,
    private postService: PostService) {
      this.normaService.onClick.subscribe(cnt => this.data = cnt);
     }
 
  ngOnInit(): void {
    this.posts$ = this.postService.getPost()
  }

  openEdit(e:MouseEvent, data:NormaStudy) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      norma: new FormControl(data.norma  === null ? null : data.norma, Validators.required),
      idbook_post: new FormControl(data.book_post === null ? null : data.book_post.id, Validators.required)
    })
    e.stopPropagation()    
  }

  openAdd(e:MouseEvent) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      norma: new FormControl(null, Validators.required),
      idbook_post: new FormControl(null, Validators.required)
    })

    this.flag = true;
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    console.log(this.form.value)
    if (this.flag) {
      this.normaService.addNormaStudy(this.form.value).subscribe(
        () => this.normaService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
    else {
      this.normaService.updateNormaStudy(this.form.value).subscribe(
        () => this.normaService.doClick(),
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
