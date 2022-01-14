import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-add-activity-table',
  templateUrl: './modal-add-activity-table.component.html',
  styleUrls: ['./modal-add-activity-table.component.css']
})
export class ModalAddActivityTableComponent implements OnInit {

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

  add() {
    this.visibility = "hidden"
  }

}
