import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { BookPost, KindActivity, NormaKindActivity } from 'src/app/interfaces/interfaces';
import { KindActivityService } from 'src/app/services/kindActivity.service';
import { NormaKindActivityService } from 'src/app/services/normaKindActivity.service';
import { PostService } from 'src/app/services/post.service';
import { NotiService } from 'src/app/utils/noti.service';
import { StrService } from 'src/app/utils/stringify.service';

@Component({
  selector: 'app-norma-kind-activity',
  templateUrl: './norma-kind-activity.component.html',
  styleUrls: ['./norma-kind-activity.component.less'],
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
export class NormaKindActivityComponent implements OnInit {


  term!: string;
  data: Observable<NormaKindActivity[]> | undefined;

  additingFlag = false;
  form!: FormGroup;
  open = false;

  messageError = "";

  post$: Observable<BookPost[]> | undefined;
  kind$: Observable<KindActivity[]> | undefined;

  valuePost!: Number | null;
  valueKind!: Number | null;

  constructor(private normaKindActivityService: NormaKindActivityService,
    private kindActivityService:KindActivityService,
    private noti: NotiService,
    public str: StrService,
    private postService: PostService) {
    this.normaKindActivityService.onClick.subscribe(cnt=>this.data = cnt);
  }

    ngOnInit(): void {
      this.getData();
      this.post$ = this.postService.getPost()
      this.kind$ = this.kindActivityService.getKindActivity()
      this.kindActivityService.getKindActivity().subscribe( (value) => {
      })
    }

    add() {
      this.open = true;
      this.form = new FormGroup({
        norma: new FormControl(null, [Validators.pattern(/^(0|[1-9]\d*)$/), Validators.required]),
        idbook_post: new FormControl(null, Validators.required),
        idkind_activity: new FormControl(null, Validators.required)
      })
      this.additingFlag = true;
      this.valuePost = null;
      this.valueKind = null;
    }

    edit(data: NormaKindActivity) {
      this.open = true;
      this.form = new FormGroup({
        id: new FormControl(data.id, Validators.required),
        norma: new FormControl(data.norma === null ? null : data.norma, [Validators.pattern(/^(0|[1-9]\d*)$/), Validators.required]),
        idbook_post: new FormControl(data.book_post === null ? null : data.book_post.id, Validators.required),
        idkind_activity: new FormControl(data.kind_activity === null ? null : data.kind_activity.id , Validators.required)
      })
      this.valuePost = data.book_post === null ? null : Number(data.book_post.id);
      this.valueKind = data.kind_activity === null ? null : Number(data.kind_activity.id);
      this.additingFlag = false;
    }

    onSubmit() {

      if (this.form.valid) {

        if (this.additingFlag) {
          this.normaKindActivityService.addNormaKindActivity(this.form.value).subscribe(
            () => {
              this.normaKindActivityService.doClick()
              this.form.reset();
              this.messageError = "";
              },
            error => {
              this.messageError = error.error.message
            }
          )
        } else {
          this.normaKindActivityService.updateNormaKindActivity(this.form.value).subscribe(
            () => {
              this.normaKindActivityService.doClick(),
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
      this.additingFlag = false;
      this.form.reset();
      this.messageError = "";
    }

    getData() {
      this.normaKindActivityService.doClick()
    }

    delete(data:NormaKindActivity) {
      const decision = window.confirm("Удалить?")
      if (decision) {
        this.normaKindActivityService.deleteNormaKindActivity(data).subscribe(
          () => this.getData(),
          error => {
            this.noti.toast(error.error.message)
          }
        )
      }
    }


}
