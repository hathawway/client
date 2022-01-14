import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-survey-activity-table',
  templateUrl: './modal-survey-activity-table.component.html',
  styleUrls: ['./modal-survey-activity-table.component.css']
})
export class ModalSurveyActivityTableComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  constructor() { }
 
  ngOnInit(): void {

  }

  open(e:MouseEvent) {
 
    this.visibility = "visible"
 
    e.stopPropagation()
  }
 
  close() {
    this.visibility = "hidden"
  }

}
