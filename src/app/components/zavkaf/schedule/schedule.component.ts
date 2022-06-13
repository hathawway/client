import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { Activity, BookPost, BookWork, Kafedra } from 'src/app/interfaces/interfaces';
import { KafedraService } from 'src/app/services/kafedra.service';
import { PostService } from 'src/app/services/post.service';
import { WorkService } from 'src/app/services/work.service';
import { StrService } from 'src/app/utils/stringify.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле обязательно для заполнения!',
        pattern: 'Только числа через точку',
      },
    },
	],
})
export class ScheduleComponent implements OnInit {

  term!: string;
  data: Observable<Kafedra[]> | undefined;

  form!: FormGroup;
  open = false;

  messageError = "";

  works$:Observable<BookWork[]> | undefined;
  posts$:Observable<BookPost[]> | undefined;

  valueWork!: Number | null;
  valuePost!: Number | null;

  constructor(private kafedraService: KafedraService,
    private workService: WorkService,
    public str: StrService,
    private postService: PostService,) {
      this.kafedraService.onClick.subscribe(cnt=>this.data = cnt);
  }


  ngOnInit(): void {
    this.getData();
    this.works$ = this.workService.getWork()
    this.posts$ = this.postService.getPost()
  }

  getData() {
    this.kafedraService.setReqSearch("office")
    this.kafedraService.doClick()
  }

  edit(kafedra: Kafedra) {
    this.open = true;
    this.form = new FormGroup({
      id: new FormControl(kafedra.id, Validators.required),
      norma: new FormControl(kafedra.norma === null ? null : kafedra.norma, [Validators.pattern(/^\d+(?:[.]\d+)?$/), Validators.required]),
      book_work:  new FormControl(kafedra.book_work === null ? null : kafedra.book_work.id, Validators.required),
      book_post: new FormControl(kafedra.book_post === null ? null : kafedra.book_post.id, Validators.required)
    })

    this.valuePost = kafedra.book_post === null ? null : Number(kafedra.book_post.id);
    this.valueWork = kafedra.book_work === null ? null : Number(kafedra.book_work.id);
  }

  onSubmit() {

    if (this.form.valid) {

      this.kafedraService.updateKafedra(this.form.value).subscribe(
        () => {
          this.kafedraService.doClick(),
          this.close()
        },
        error => {
          this.messageError = error.error.message
        }
      )

  } else {
    this.form.markAllAsTouched();
  }

  }

  close() {
    this.open = false;
    this.messageError = "";
  }


}
