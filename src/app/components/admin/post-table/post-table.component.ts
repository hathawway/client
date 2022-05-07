import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable } from 'rxjs';
import { BookPost } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';
import { NotiService } from 'src/app/utils/noti.service';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.less'],
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
export class PostTableComponent implements OnInit {

  term!: string;
  data: Observable<BookPost[]> | undefined;

  flag = false;
  form!: FormGroup;
  open = false;

  messageError = "";

  constructor(private postService: PostService,
    private noti: NotiService) { 
      this.postService.onClick.subscribe(cnt=>this.data = cnt);
  }

  ngOnInit(): void {
    this.getData();  
  }

  add() {
    this.messageError = ""
	  this.open = true;
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      ispps: new FormControl(null),
    })
    this.flag = true;
	}

  edit(data: BookPost) {
    this.messageError = ""
	  this.open = true;
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      name: new FormControl(data.name, Validators.required),
      ispps: new FormControl(data.ispps, Validators.required),
    })
	}

  onSubmit() {
    console.log(this.form.value)
    this.form.disable()

    if (this.flag) {
      this.postService.addPost(this.form.value).subscribe(
        () => {
          this.postService.doClick(),
          this.form.reset();
        },
        error => {
          this.messageError = error.error.message
        }
      )
    }
    else {
      this.postService.updatePost(this.form.value).subscribe(
        () => {
          this.postService.doClick(),
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
    this.postService.doClick()
  }

  delete(post:BookPost) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.postService.deletePost(post).subscribe(
        () => this.getData(),
        error => {
          this.noti.toast(error.error.message)
        }
      )
    }
  }


}
