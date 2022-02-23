import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Activity, NormaActivity, StavkaYear, BookPost, BookUnit } from 'src/app/interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-modal-add-stavka-shared',
  templateUrl: './modal-add-stavka-shared.component.html',
  styleUrls: ['./modal-add-stavka-shared.component.css']
})
export class ModalAddStavkaSharedComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;
  activities$: Observable<Activity[]> | undefined;
  posts$: Observable<BookPost[]> | undefined;
  units$: Observable<BookUnit[]> | undefined;

  constructor(private normaService : NormaService,
    private postService : PostService,
    private router: Router,
    private route: ActivatedRoute) { }
 
  ngOnInit(): void {
      this.activities$ = this.normaService.getActivity()
      this.posts$ = this.postService.getPost()
      this.units$ = this.normaService.getBookUnit()
  }

  openEdit(e:MouseEvent, data:NormaActivity) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      norma: new FormControl(data.norma, Validators.required),
      idbook_post: new FormControl(data.book_post.id, Validators.required),
      idactivity: new FormControl(data.activity.id, Validators.required),
      idbook_unit: new FormControl(data.book_unit.id, Validators.required)
    })
    e.stopPropagation()    
  }

  openAdd(e:MouseEvent) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      norma: new FormControl(null, Validators.required),
      idbook_post: new FormControl(null, Validators.required),
      idactivity: new FormControl(null, Validators.required),
      idbook_unit: new FormControl(null, Validators.required)
    })

    this.flag = !this.flag
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    console.log(this.form.value)
    if (this.flag) {
      this.normaService.addNormaActivity(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/stavka-shared/']),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }
    else {
      this.normaService.updateNormaActivity(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/stavka-shared/']),
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
