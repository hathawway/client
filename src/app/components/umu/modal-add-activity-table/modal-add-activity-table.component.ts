import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Activity, BookUnit, KindActivity } from 'src/app/interfaces/interfaces';
import { ActivityService } from 'src/app/services/activity.service';
import { KindActivityService } from 'src/app/services/kindActivity.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-modal-add-activity-table',
  templateUrl: './modal-add-activity-table.component.html',
  styleUrls: ['./modal-add-activity-table.component.css']
})
export class ModalAddActivityTableComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;
  kinds$: Observable<KindActivity[]> | undefined;
  units$: Observable<BookUnit[]> | undefined;
  data: Observable<Activity[]> | undefined;

  constructor(private kindActivityService: KindActivityService,
    private unitService: UnitService,
    private activityService: ActivityService) {
      this.activityService.onClick.subscribe(cnt => this.data = cnt);
  }
 
  ngOnInit(): void {
    this.kinds$ = this.kindActivityService.getKindActivity()
    this.units$ = this.unitService.getBookUnit()
  }

  openAdd(e:MouseEvent) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      norma: new FormControl(null, Validators.required),
      idkind_activity: new FormControl(null, Validators.required),
      idbook_unit: new FormControl(null, Validators.required)
    })
    this.flag = true;
    e.stopPropagation()  
  }

  openEdit(e:MouseEvent, data: Activity) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      name: new FormControl(data.name === null ? null : data.name, Validators.required),
      norma: new FormControl(data.norma === null ? null : data.norma, Validators.required),
      idkind_activity: new FormControl(data.kind_activity === null ? null : data.kind_activity.id, Validators.required),
      idbook_unit: new FormControl(data.book_unit === null ? null : data.book_unit.id, Validators.required)
    })
    e.stopPropagation()  
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    if (this.flag) {
      this.activityService.addActivity(this.form.value).subscribe(
        () => this.activityService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
    else {
      this.activityService.updateActivity(this.form.value).subscribe(
        () => this.activityService.doClick(),
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
