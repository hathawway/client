import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Kafedra } from 'src/app/interfaces/interfaces';
import { ModalSurveyScheduleComponent } from '../modal-survey-schedule/modal-survey-schedule.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @ViewChild(ModalSurveyScheduleComponent) menu:ModalSurveyScheduleComponent 

  term: string;
  data$: Observable<Kafedra[]> | undefined;
  //users$: Observable<User[]> | undefined;

  openMenu(e, kafedra: Kafedra) {
    this.menu.open(e, kafedra)
  }

  ngOnInit(): void {
    // вставить id кафедры к которой прикреплен завкаф
    // this.data$ = this.kafedraService.getKafedra(this.user.book_office.id)
  }


}
