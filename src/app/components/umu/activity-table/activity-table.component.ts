import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { Activity, BookUnit, KindActivity } from 'src/app/interfaces/interfaces';
import { ActivityService } from 'src/app/services/activity.service';
import { KindActivityService } from 'src/app/services/kindActivity.service';
import { UnitService } from 'src/app/services/unit.service';
import { NotiService } from 'src/app/utils/noti.service';
import { StrService } from 'src/app/utils/stringify.service';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле обязательно для заполнения!',
        pattern: 'Вводимое значение должно быть целым числом!',
      },
    },
	],
})
export class ActivityTableComponent implements OnInit {

  term!: string;
  data: Observable<Activity[]> | undefined;

  flag = false;
  form!: FormGroup;
  open = false;

  messageError = "";

  unit$: Observable<BookUnit[]> | undefined;
  kind$: Observable<KindActivity[]> | undefined;

  valueUnit!: Number | null;
  valueKind!: Number | null;

  constructor(private activityService: ActivityService,
    private noti: NotiService,
    private unitService: UnitService,
    public str: StrService,
    private kindActivityService: KindActivityService) {
      this.activityService.onClick.subscribe(cnt=>this.data = cnt);
    }

    add() {
      this.open = true;
      this.form = new FormGroup({
        name: new FormControl(null, Validators.required),
        kind_activity: new FormControl(null, Validators.required),
        norma: new FormControl(null, [Validators.pattern(/^(0|[1-9]\d*)$/), Validators.required]),
        book_unit: new FormControl(null, Validators.required)
      })
      this.flag = true;
      this.valueUnit = null;
      this.valueKind = null;
    }

    edit(data: Activity) {
      this.open = true;
      this.form = new FormGroup({
        id: new FormControl(data.id, Validators.required),
        name: new FormControl(data.name, Validators.required),
        kind_activity: new FormControl(data.kind_activity === null ? null : data.kind_activity.id, Validators.required),
        norma: new FormControl(data.norma === null ? null : data.norma, [Validators.pattern(/^(0|[1-9]\d*)$/), Validators.required]),
        book_unit: new FormControl(data.book_unit === null ? null : data.book_unit.id, Validators.required)
      })
      this.valueUnit = data.book_unit === null ? null : Number(data.book_unit.id);
      this.valueKind = data.kind_activity === null ? null : Number(data.kind_activity.id);
    }

    onSubmit() {

      if (this.form.valid) {

        if (this.flag) {
          this.activityService.addActivity(this.form.value).subscribe(
            () => {
              this.activityService.doClick(),
              this.messageError = "",
              this.form.reset();
            },
            error => {
              this.messageError = error.error.message
            }
          )
        }
        else {
          this.activityService.updateActivity(this.form.value).subscribe(
            () => {
              this.activityService.doClick(),
              this.close()
            },
            error => {
              this.messageError = error.error.message
            }
          )
        }
    } else {
      this.form.markAllAsTouched();
    }

    }

    close() {
      this.open = false;
      this.flag = false;
      this.form.reset();
      this.messageError = "";
    }

  ngOnInit(): void {
    this.getData();
    this.unit$ = this.unitService.getBookUnit()
    this.kind$ = this.kindActivityService.getKindActivity()
  }

  getData() {
    this.activityService.doClick()
  }

  delete(data:Activity) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.activityService.deleteActivity(data).subscribe(
        () => this.getData(),
        error => {
          this.noti.toast(error.error.message)
        }
      )
    }
  }

}
