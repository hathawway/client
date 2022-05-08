import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { BookPost, NormaStudy, StavkaYear } from 'src/app/interfaces/interfaces';
import { NormaStudyService } from 'src/app/services/normaStudy.service';
import { PostService } from 'src/app/services/post.service';
import { StavkaYearService } from 'src/app/services/stavkaYear.service';
import { NotiService } from 'src/app/utils/noti.service';
import { StrService } from 'src/app/utils/stringify.service';

@Component({
  selector: 'app-stavka-table',
  templateUrl: './stavka-table.component.html',
  styleUrls: ['./stavka-table.component.less'],
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
export class StavkaTableComponent implements OnInit {

  term!: string;
  data: Observable<NormaStudy[]> | undefined;
  stavka$: Observable<StavkaYear> | undefined;
  flag = false;
  form!: FormGroup;
  formStavka!: FormGroup;
  open = false;
  openSt = false;

  messageError = "";

  valuePost!: Number | null;
  posts$!: Observable<BookPost[]>;

  constructor(private normaStudyService: NormaStudyService,
    private noti: NotiService,
    private postService: PostService,
    public str: StrService,
    private stavkaYearService: StavkaYearService) {
    this.normaStudyService.onClick.subscribe(cnt=>this.data = cnt);
  }

    ngOnInit(): void {
      this.getData();
      this.posts$ = this.postService.getPost()
      this.stavka$ = this.stavkaYearService.getStavkaYearOne()
      this.getStavka()
    }

    getStavka() {
      this.stavka$ = this.stavkaYearService.getStavkaYearOne()
    }

    add() {
      this.open = true;
      this.form = new FormGroup({
        idbook_post: new FormControl(null, Validators.required),
        norma: new FormControl(null, Validators.required),
      })
      this.flag = true;
      this.valuePost = null;
    }

    edit(data: NormaStudy) {
      this.open = true;
      this.form = new FormGroup({
        id: new FormControl(data.id, Validators.required),
        norma: new FormControl(data.norma  === null ? null : data.norma, Validators.required),
        idbook_post: new FormControl(data.book_post === null ? null : data.book_post.id, Validators.required)
      })
      this.valuePost = data.book_post === null ? null : Number(data.book_post.id);

    }

    openStavka(stavka: StavkaYear) {
      this.openSt = true;
      this.formStavka = new FormGroup({
        id: new FormControl(stavka.id, Validators.required),
        norma: new FormControl(stavka.norma, Validators.required)
      })
    }

    updateStavka() {
      this.formStavka.disable()
      this.stavkaYearService.updateStavkaYear(this.formStavka.value).subscribe(
          () => {
            this.closeStavka();
            this.getStavka();
          },
          error => {
            this.messageError = error.error.message
          }
      )
      this.formStavka.enable()

    }

    closeStavka() {
      this.openSt = false;
      this.messageError = "";
    }

    onSubmit() {
      this.form.disable()

      if (this.flag) {
        this.normaStudyService.addNormaStudy(this.form.value).subscribe(
          () => {
            this.normaStudyService.doClick(),
            this.form.reset();
          },
          error => {
            this.messageError = error.error.message
          }
        )
      }
      else {
        this.normaStudyService.updateNormaStudy(this.form.value).subscribe(
          () => {
            this.normaStudyService.doClick(),
            this.close()
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

    getData() {
      this.normaStudyService.doClick()
    }

    delete(data:NormaStudy) {
      const decision = window.confirm("Удалить?")
      if (decision) {
        this.normaStudyService.deleteNormaStudy(data).subscribe(
          () => this.getData(),
          error => {
            this.noti.toast(error.error.message)
          }
        )
      }
    }


}
