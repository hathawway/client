import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-modal-add-office-table',
  templateUrl: './modal-add-office-table.component.html',
  styleUrls: ['./modal-add-office-table.component.css']
})
export class ModalAddOfficeTableComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  constructor() { }
 
  ngOnInit() {
  }

  open(e:MouseEvent) {

 
    this.visibility = "visible"
 
    e.stopPropagation()
  }
 
  close() {
    this.visibility = "hidden"
  }
 
  

}
