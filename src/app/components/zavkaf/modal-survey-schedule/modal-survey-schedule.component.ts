import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-survey-schedule',
  templateUrl: './modal-survey-schedule.component.html',
  styleUrls: ['./modal-survey-schedule.component.css']
})
export class ModalSurveyScheduleComponent implements OnInit {

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

  save() {
    this.visibility = "hidden"
  }

}
