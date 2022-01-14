import { Component, OnInit, HostBinding, HostListener, Input  } from '@angular/core';

@Component({
  selector: 'app-modal-survey-user',
  templateUrl: './modal-survey-user.component.html',
  styleUrls: ['./modal-survey-user.component.css']
})
export class ModalSurveyUserComponent implements OnInit {

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
