import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Activity, Ip, IpPps, KindActivity, User } from 'src/app/interfaces/interfaces';
import { ActivityService } from 'src/app/services/activity.service';
import { AuthService } from 'src/app/services/auth.service';
import { IpService } from 'src/app/services/ip.service';
import { IpPpsService } from 'src/app/services/ipPps.service';
import { KindActivityService } from 'src/app/services/kindActivity.service';
import { NotiService } from 'src/app/utils/noti.service';

@Component({
  selector: 'app-modal-pp-edit',
  templateUrl: './modal-pp-edit.component.html',
  styleUrls: ['./modal-pp-edit.component.less']
})
export class ModalPpEditComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;
  
  kind_activity$: Observable<KindActivity[]> | undefined;
  activity$: Observable<Activity[]> | undefined;
  
  data!: Observable<IpPps[]>;
  user!: User; 

  //ipArr!: IpPps[];

  constructor(private ipPpsService: IpPpsService,
    private kindActivityService: KindActivityService,
    private activityService: ActivityService,
    private authService: AuthService,
    private noti: NotiService) {
      this.ipPpsService.onClick.subscribe(cnt => this.data = cnt);
      
  }
 
  ngOnInit(): void {
    // this.authService.getUserByHeader().subscribe( data => this.user = data)

    this.kind_activity$ = this.kindActivityService.getKindActivity()
    this.activity$ = this.activityService.getActivity()

    // console.log(this.data)
  }

  openAdd(e:MouseEvent) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      semester: new FormControl(null, Validators.required),
      kind_activity: new FormControl(null, Validators.required),
      activity: new FormControl(null, Validators.required),
      unitPlan: new FormControl(null, Validators.required),
      hourPlan: new FormControl(null, Validators.required),
      datePlan: new FormControl(null, Validators.required),
      unitFact: new FormControl(null, Validators.required),
      hourFact: new FormControl(null, Validators.required),
      dateFact: new FormControl(null, Validators.required),
      remark: new FormControl(null, Validators.required),
      idip: new FormControl(this.ipPpsService.getId(), Validators.required),
    })
    this.flag = true;
    e.stopPropagation()  
  }

  openEdit(e:MouseEvent, data: IpPps) {
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      semester: new FormControl(data.semester, Validators.required),
      kind_activity: new FormControl(data.kind_activity === null ? null : data.kind_activity.id, Validators.required),
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
    if (this.flag) {
      this.ipPpsService.addIpPps(this.form.value).subscribe(
        () => this.ipPpsService.doClick(),
        error => {
          this.noti.toast(error.error.message)
        }
      )
    }
    else {
      this.ipPpsService.updateIpPps(this.form.value).subscribe(
        () => this.ipPpsService.doClick(),
        error => {
          this.noti.toast(error.error.message)

        }
      )
    }           
    this.form.enable()
    this.flag = false;
    this.visibility = "hidden"
    
  }


}
