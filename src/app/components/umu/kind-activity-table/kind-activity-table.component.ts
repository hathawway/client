import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { KindActivityService } from 'src/app/services/kindActivity.service';
import { RoleService } from 'src/app/services/role.service';
import { NotiService } from 'src/app/utils/noti.service';
import { StrService } from 'src/app/utils/stringify.service';
import { KindActivity, Role } from './../../../interfaces/interfaces';

@Component({
  selector: 'app-kind-activity-table',
  templateUrl: './kind-activity-table.component.html',
  styleUrls: ['./kind-activity-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле обязательно для заполнения!',
      },
    },
	],
})
export class KindActivityTableComponent implements OnInit {

  term!: string;
  data: Observable<KindActivity[]> | undefined;

  flag = false;
  form!: FormGroup;
  open = false;

  messageError = "";

  role$: Observable<Role[]> | undefined;

  value!: Number | null;

  constructor(private kindActivityService: KindActivityService,
    private roleService : RoleService,
    public str: StrService,
    private noti: NotiService) {
    this.kindActivityService.onClick.subscribe(cnt=>this.data = cnt);
  }

  add() {
	  this.open = true;
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      iduser: new FormControl(null)
    })
    this.flag = true;
    this.value = null;
	}

  edit(data: KindActivity) {
	  this.open = true;
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      name: new FormControl(data.name, Validators.required),
      iduser: new FormControl(data.user === null ? null : data.user.id)
    })
    this.value = data.user === null ? null : Number(data.user.id);
	}

  onSubmit() {

    if (this.form.valid) {

    if (this.flag) {
      this.kindActivityService.addKindActivity(this.form.value).subscribe(
        () => {
          this.kindActivityService.doClick(),
          this.messageError = "",
          this.form.reset();
        },
        error => {
          this.messageError = error.error.message
        }
      )
    }
    else {
      this.kindActivityService.updateKindActivity(this.form.value).subscribe(
        () => {
          this.kindActivityService.doClick(),
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
      this.role$ = this.roleService.getRole()
    }

    getData() {
      this.kindActivityService.doClick()
    }

  delete(data:KindActivity) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.kindActivityService.deleteKindActivity(data).subscribe(
        () => this.getData(),
        error => {
          this.noti.toast(error.error.message)
        }
      )
    }
  }


}
