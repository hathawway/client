import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookPost, BookWork, Kafedra } from 'src/app/interfaces/interfaces';
import { KafedraService } from 'src/app/services/kafedra.service';
import { PostService } from 'src/app/services/post.service';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-modal-survey-schedule',
  templateUrl: './modal-survey-schedule.component.html',
  styleUrls: ['./modal-survey-schedule.component.css']
})
export class ModalSurveyScheduleComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  data:Observable<Kafedra[]> | undefined;
  works$:Observable<BookWork[]> | undefined;
  posts$:Observable<BookPost[]> | undefined;

  constructor(private kafedraService: KafedraService, 
    private workService: WorkService,
    private postService: PostService) {
      this.kafedraService.onClick.subscribe(cnt => this.data = cnt);
     }
 
  ngOnInit(): void {
    this.works$ = this.workService.getWork()
    this.posts$ = this.postService.getPost()
  }

  open(e:MouseEvent, kafedra: Kafedra) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(kafedra.id, Validators.required),
      norma: new FormControl(kafedra.norma === null ? null : kafedra.norma, Validators.required),
      user: new FormControl(kafedra.user === null ? null : kafedra.user.id, Validators.required),
      book_work:  new FormControl(kafedra.book_work === null ? null : kafedra.book_work.id, Validators.required),
      book_office: new FormControl(kafedra.book_office === null ? null : kafedra.book_office.id, Validators.required),
      book_post: new FormControl(kafedra.book_post === null ? null : kafedra.book_post.id, Validators.required)
    })
 
    e.stopPropagation()
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    console.log(this.form.value)
    this.kafedraService.updateKafedra(this.form.value).subscribe(
      () => this.kafedraService.doClick(),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )

    this.form.enable()
    this.visibility = "hidden"
  }

}
