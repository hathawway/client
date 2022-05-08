import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { BookOffice } from 'src/app/interfaces/interfaces';
import { OfficeService } from 'src/app/services/office.service';
import { NotiService } from 'src/app/utils/noti.service';

@Component({
  selector: 'app-office-table',
  templateUrl: './office-table.component.html',
  styleUrls: ['./office-table.component.less'],
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
export class OfficeTableComponent implements OnInit {

  term!: string;
  data!: Observable<BookOffice[]>;

  flag = false;
  form!: FormGroup;
  open = false;

  messageError = "";

  constructor(private officeService: OfficeService,
    private noti: NotiService) {
      this.officeService.onClick.subscribe(cnt=>this.data = cnt);
  }

	add() {
	  this.open = true;
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
    this.flag = true;
	}

  edit(data: BookOffice) {
	  this.open = true;
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      name: new FormControl(data.name, Validators.required)
    })
	}

  onSubmit() {

    this.form.disable()

    if (this.flag) {
      this.officeService.addOffice(this.form.value).subscribe(
        () => {
          this.officeService.doClick(),
          this.form.reset();
        },
        error => {
          this.messageError = error.error.message
        }
      )
    }
    else {
      this.officeService.updateOffice(this.form.value).subscribe(
        () => {
          this.officeService.doClick(),
          this.close();
        },
        error => {
          this.messageError = error.error.message
        }
      )
    }
    this.form.enable()

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
    this.officeService.doClick()
  }


  delete(office:BookOffice) {
    const decision = window.confirm("Удалить?")
      if (decision) {
        this.officeService.deleteOffice(office).subscribe(
          () => this.getData(),
          error => {
            this.noti.toast(error.error.message)
          }
        )
      }
    }

}


