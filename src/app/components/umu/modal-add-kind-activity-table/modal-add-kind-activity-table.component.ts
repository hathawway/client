import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-modal-add-kind-activity-table',
  templateUrl: './modal-add-kind-activity-table.component.html',
  styleUrls: ['./modal-add-kind-activity-table.component.css']
})
export class ModalAddKindActivityTableComponent implements OnInit {

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
