import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAddActivityTableComponent } from '../modal-add-activity-table/modal-add-activity-table.component';
import { ModalSurveyActivityTableComponent } from '../modal-survey-activity-table/modal-survey-activity-table.component';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.css']
})
export class ActivityTableComponent implements OnInit {

  @ViewChild(ModalAddActivityTableComponent) menu:ModalAddActivityTableComponent 
  @ViewChild(ModalSurveyActivityTableComponent) table:ModalSurveyActivityTableComponent 
 
  openMenu(e) {
    this.menu.open(e)
  }

  openTable(e) {
    this.table.open(e)
  }

  ngOnInit(): void {
    
  }

}