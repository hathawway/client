import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/interfaces';

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

  openAdd(e:MouseEvent) {
 
    this.visibility = "visible"
 
    e.stopPropagation()
  }

  openEdit(e:MouseEvent, data: Activity) {
 
    this.visibility = "visible"
 
    e.stopPropagation()
  }
 
  close() {
    this.visibility = "hidden"
  }



}
