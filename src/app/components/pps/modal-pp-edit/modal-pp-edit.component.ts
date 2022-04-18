import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Activity, Ip, KindActivity, User } from 'src/app/interfaces/interfaces';
import { ActivityService } from 'src/app/services/activity.service';
import { AuthService } from 'src/app/services/auth.service';
import { IpService } from 'src/app/services/ip.service';
import { KindActivityService } from 'src/app/services/kindActivity.service';

@Component({
  selector: 'app-modal-pp-edit',
  templateUrl: './modal-pp-edit.component.html',
  styleUrls: ['./modal-pp-edit.component.css']
})
export class ModalPpEditComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;
  
  kindActivity$: Observable<KindActivity[]> | undefined;
  activity$: Observable<Activity[]> | undefined;
  
  data!: Observable<Ip[]>;
  user!: User; 

  //ipArr!: IpPps[];

  constructor(private ipService: IpService,
    private kindActivityService: KindActivityService,
    private activityService: ActivityService,
    private authService: AuthService) {
      this.ipService.onClick.subscribe(cnt => this.data = cnt);
  }
 
  ngOnInit(): void {
    this.authService.getUserByHeader().subscribe( data => this.user = data)

    this.kindActivity$ = this.kindActivityService.getKindActivity()
    this.activity$ = this.activityService.getActivity()

    console.log(this.data)
  }

  openAdd(e:MouseEvent) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      semester: new FormControl(null, Validators.required),
      kindActivity: new FormControl(null, Validators.required),
      activity: new FormControl(null, Validators.required),
      unitPlan: new FormControl(null, Validators.required),
      hourPlan: new FormControl(null, Validators.required),
      datePlan: new FormControl(null, Validators.required),
      unitFaсt: new FormControl(null, Validators.required),
      hourFaсt: new FormControl(null, Validators.required),
      dateFaсt: new FormControl(null, Validators.required),
      remark: new FormControl(null, Validators.required),
    })
    this.flag = true;
    e.stopPropagation()  
  }

  openEdit(e:MouseEvent, data: Ip) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      semester: new FormControl(data.semester, Validators.required),
      kindActivity: new FormControl(data.kindActivity === null ? null : data.kindActivity.id, Validators.required),
      activity: new FormControl(data.activity === null ? null : data.activity.id, Validators.required),
      unitPlan: new FormControl(data.unitPlan, Validators.required),
      hourPlan: new FormControl(data.hourPlan, Validators.required),
      datePlan: new FormControl(data.datePlan, Validators.required),
      unitFact: new FormControl(data.unitFact, Validators.required),
      hourFact: new FormControl(data.hourFact, Validators.required),
      dateFact: new FormControl(data.dateFact, Validators.required),
      remark: new FormControl(data.remark, Validators.required),
    })
    e.stopPropagation()  
  }
 
  close() {
    this.visibility = "hidden"
  }


  onSubmit() {
    this.form.disable()
    console.log(this.form.value)
    // if (this.flag) {
    //   this.ipService.addIp(this.form.value, "").subscribe(
    //     () => this.ipService.doClick(),
    //     error => {
    //       MaterialService.toast(error.error.message)
    //     }
    //   )
    // }
    // else {
    //   this.ipService.updateIp(this.ipService.getId(), this.form.value, "").subscribe(
    //     () => this.ipService.doClick(),
    //     error => {
    //       MaterialService.toast(error.error.message)

    //     }
    //   )
    // }           
    this.form.enable()
    this.flag = false;
    this.visibility = "hidden"
    
  }


}
