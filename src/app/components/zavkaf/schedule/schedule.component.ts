import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Kafedra } from 'src/app/interfaces/interfaces';
import { KafedraService } from 'src/app/services/kafedra.service';
import { ModalSurveyScheduleComponent } from '../modal-survey-schedule/modal-survey-schedule.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @ViewChild(ModalSurveyScheduleComponent) menu!:ModalSurveyScheduleComponent 

  term!: string;
  data: Observable<Kafedra[]> | undefined;

  constructor(private kafedraService: KafedraService) {
      this.kafedraService.onClick.subscribe(cnt=>this.data = cnt);
  }

  openMenu(e, kafedra: Kafedra) {
    this.menu.open(e, kafedra)
  }

  ngOnInit(): void {
    this.getData();  
  }

  getData() {
    this.kafedraService.setReqSearch("office")
    this.kafedraService.doClick()
  }


}
