import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Activity, NormaActivity, StavkaYear, BookPost, BookUnit } from 'src/app/interfaces/interfaces';
import { ActivityService } from 'src/app/services/activity.service';
import { NormaActivityService } from 'src/app/services/normaActivity.service';
import { PostService } from 'src/app/services/post.service';
import { UnitService } from 'src/app/services/unit.service';

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

  data: Observable<NormaActivity[]> | undefined;


  constructor(private normaActivityService : NormaActivityService,
    private activityService : ActivityService,
    private unitService : UnitService,
    private postService : PostService) { 
      this.normaActivityService.onClick.subscribe(cnt => this.data = cnt);
    }
 
  ngOnInit(): void {
      this.activities$ = this.activityService.getActivity()
      this.posts$ = this.postService.getPost()
      this.units$ = this.unitService.getBookUnit()
  }

  openEdit(e:MouseEvent, data:NormaActivity) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      norma: new FormControl(data.norma === null ? null : data.norma, Validators.required),
      idbook_post: new FormControl(data.book_post === null ? null : data.book_post.id, Validators.required),
      idactivity: new FormControl(data.activity === null ? null : data.activity.id, Validators.required),
      idbook_unit: new FormControl(data.book_unit === null ? null : data.book_unit.id, Validators.required)
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
      this.normaActivityService.addNormaActivity(this.form.value).subscribe(
        () => this.normaActivityService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
    else {
      this.normaActivityService.updateNormaActivity(this.form.value).subscribe(
        () => this.normaActivityService.doClick(),
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
