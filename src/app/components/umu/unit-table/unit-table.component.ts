import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { BookUnit } from 'src/app/interfaces/interfaces';
import { UnitService } from 'src/app/services/unit.service';
import { NotiService } from 'src/app/utils/noti.service';

@Component({
  selector: 'app-unit-table',
  templateUrl: './unit-table.component.html',
  styleUrls: ['./unit-table.component.less'],
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
export class UnitTableComponent implements OnInit {

  data: Observable<BookUnit[]> | undefined;
  term!: string;

  flag = false;
  form!: FormGroup;
  open = false;

  messageError = "";

  constructor(private unitService: UnitService,
    private noti: NotiService) {
      this.unitService.onClick.subscribe(cnt=>this.data = cnt);
    }

    add() {
      this.open = true;
      this.form = new FormGroup({
        name: new FormControl(null, Validators.required)
      })
      this.flag = true;
    }

    edit(data: BookUnit) {
      this.open = true;
      this.form = new FormGroup({
        id: new FormControl(data.id, Validators.required),
        name: new FormControl(data.name, Validators.required)
      })
    }

    onSubmit() {

      if (this.form.valid) {

        if (this.flag) {
          this.unitService.addBookUnit(this.form.value).subscribe(
            () => {
              this.unitService.doClick(),
              this.messageError = "",
              this.form.reset();
            },
            error => {
              this.messageError = error.error.message
            }
          )
        }
        else {
          this.unitService.updateBookUnit(this.form.value).subscribe(
            () => {
              this.unitService.doClick(),
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
  }

  getData() {
    this.unitService.doClick()
  }


  delete(data:BookUnit) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.unitService.deleteBookUnit(data).subscribe(
        () => this.getData(),
        error => {
          this.noti.toast(error.error.message)
        }
      )
    }
  }

}

