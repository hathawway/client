import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay, TUI_LAST_DAY } from '@taiga-ui/cdk';
import { TuiNamedDay, TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { Activity, Ip, IpPps, Kafedra, KindActivity } from 'src/app/interfaces/interfaces';
import { ActivityService } from 'src/app/services/activity.service';
import { AuthService } from 'src/app/services/auth.service';
import { IpService } from 'src/app/services/ip.service';
import { IpPpsService } from 'src/app/services/ipPps.service';
import { KafedraService } from 'src/app/services/kafedra.service';
import { KindActivityService } from 'src/app/services/kindActivity.service';
import { NotiService } from 'src/app/utils/noti.service';
import { StrService } from 'src/app/utils/stringify.service';

@Component({
  selector: 'app-edit-pp',
  templateUrl: './edit-pp.component.html',
  styleUrls: ['./edit-pp.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
          required: 'Поле обязательно для заполнения!',
          pattern:'Только числа!'
      },
  },
],
})
export class EditPpComponent implements OnInit {

  kafedra$: Observable<Kafedra[]> | undefined;
  data: Observable<IpPps[]> | undefined;
  dataIp: Observable<Ip[]> | undefined;
  id:string | undefined;

  form!: FormGroup;
  formIp!: FormGroup;
  ip!: Ip[];
  //data: Observable<IpPps[]> | undefined;
  open = false;

  checkAdd = false;

  messageError = "";

  valueKafedra!: Number | null;

  valueKind!: Number | null;
  valueActivity!: Number | null;



  kind_activity$: Observable<KindActivity[]> | undefined;
  activity$: Observable<Activity[]> | undefined;

  flag = false;

  from: TuiDay | null = null;
	to: TuiDay | null = null;
	min = new TuiDay(2017, 9, 4);
	max = TuiDay.currentLocal();
	items = [
	  new TuiNamedDay(
	    TUI_LAST_DAY.append({year: -1}),
	    'Сегодня',
	    TuiDay.currentLocal(),
	  ),
	];

  semesterItems = [
    '1',
    '2'
  ]

  valueSemester!: string | null;


  constructor(private kafedraService: KafedraService,
    private kindActivityService: KindActivityService,
    private activityService: ActivityService,
    private authService: AuthService,
    private ipPpsService: IpPpsService,
    private ipService: IpService,
    public str: StrService,
    private noti: NotiService) {
      this.ipPpsService.onClick.subscribe(cnt=>this.data = cnt);
      this.ipService.onClick.subscribe(cnt=>this.dataIp = cnt);
    }

    ngOnInit(): void {
      this.authService.getUserByHeader().subscribe(d => this.ipService.setId(d.id))
      this.kafedraService.setReqSearch("user")
      this.kafedra$ = this.kafedraService.getKafedra(this.kafedraService.getReqSearch())
      this.getData();
      const ipId = this.ipPpsService.getId()
      if (!ipId) {
        this.checkAdd = true
        this.form = new FormGroup({
          data_start: new FormControl(null, Validators.required),
          data_end: new FormControl(null, Validators.required),
          kafedra: new FormControl(null, Validators.required),
        })
      } else {
        this.ipService.getIpById(ipId).subscribe( (value) => {
          this.form = new FormGroup({
            id: new FormControl(value.id, Validators.required),
            data_start: new FormControl(value.data_start === null ? null : value.data_start, Validators.required),
            data_end: new FormControl(value.data_end === null ? null : value.data_end, Validators.required),
            kafedra: new FormControl(value.kafedra === null ? null : value.kafedra.id, Validators.required),
          })
          this.valueKafedra = value.kafedra === null ? null : Number(value.kafedra.id);
          const dataStart = value.data_start.toString().split('-')
          const dataEnd = value.data_end.toString().split('-')
          this.from = value.data_start === null ? null : new TuiDay(Number(dataStart[0]), Number(dataStart[1]), Number(dataStart[2]));
          this.to = value.data_end === null ? null : new TuiDay(Number(dataEnd[0]), Number(dataEnd[1]), Number(dataEnd[2]));
        })
      }


    }

    getData() {
      //this.ipService.setReqSearch("office")
      this.ipPpsService.doClick()
    }

    getDataModel() {
      this.kind_activity$ = this.kindActivityService.getKindActivity()
      this.activity$ = this.activityService.getActivity()
    }

    add() {
      this.open = true;
      this.getDataModel()
      this.formIp = new FormGroup({
        semester: new FormControl(null, Validators.required),
        kind_activity: new FormControl(null, Validators.required),
        activity: new FormControl(null, Validators.required),
        unitPlan: new FormControl(null),
        hourPlan: new FormControl(null),
        datePlan: new FormControl(null),
        unitFact: new FormControl(null),
        hourFact: new FormControl(null),
        dateFact: new FormControl(null),
        remark: new FormControl(null),
        idip: new FormControl(this.ipPpsService.getId(), Validators.required),
      })
      this.flag = true;
    }

    edit(data: IpPps) {
      this.getDataModel()
      this.open = true;

      this.form = new FormGroup({
        id: new FormControl(data.id, Validators.required),
        semester: new FormControl(data.semester, Validators.required),
        kind_activity: new FormControl(data.kind_activity === null ? null : data.kind_activity.id, Validators.required),
        activity: new FormControl(data.activity === null ? null : data.activity.id, Validators.required),
        unitPlan: new FormControl(data.unitPlan, Validators.pattern(/[0-9]/)),
        hourPlan: new FormControl(data.hourPlan),
        datePlan: new FormControl(data.datePlan),
        unitFact: new FormControl(data.unitFact, Validators.pattern(/[0-9]/)),
        hourFact: new FormControl(data.hourFact),
        dateFact: new FormControl(data.dateFact),
        remark: new FormControl(data.remark),
      })

      this.valueSemester = data.semester;
    }

    onSubmit() {
    this.formIp.disable()
    if (this.flag) {
      this.ipPpsService.addIpPps(this.formIp.value).subscribe(
        () => {
          this.ipPpsService.doClick()
          this.formIp.reset();
        },
        error => {
          this.messageError = error.error.message;
        }
      )
    } else {
      this.ipPpsService.updateIpPps(this.formIp.value).subscribe(
        () => {
          this.ipPpsService.doClick(),
          this.close();
        },
        error => {
          this.messageError = error.error.message;

        }
      )
    }
    this.form.enable()

  }

    close() {
      this.open = false;
      this.formIp.reset()
      this.flag = false;
    }

    save() {
      this.form.disable()
      if (this.form.value.id) {
        this.ipService.updateIp(this.form.value).subscribe(
          () => {
            this.ipService.doClick();
          },
          error => {
            this.messageError = error.error.message
          }
        )
      } else {
        this.ipService.addIp(this.form.value).subscribe(
          () => {
            this.ipService.doClick();
          },
          error => {
            this.messageError = error.error.message
          }
        )
      }

      this.form.enable()
    }

    delete(data: IpPps) {
      const decision = window.confirm("Удалить?")
      if (decision) {
        this.ipPpsService.deleteIpPps(data).subscribe(
          () => this.getData(),
          error => {
            this.noti.toast(error.error.message)
          }
        )
      }
    }
}
