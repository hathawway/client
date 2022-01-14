import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalSurveyScheduleComponent } from '../modal-survey-schedule/modal-survey-schedule.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @ViewChild(ModalSurveyScheduleComponent) menu:ModalSurveyScheduleComponent 

  openMenu(e) {
    this.menu.open(e)
  }

  ngOnInit(): void {
    
  }


}
