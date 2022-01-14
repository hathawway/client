import { Component, OnInit, HostBinding, HostListener, Input   } from '@angular/core';

@Component({
  selector: 'app-modal-add-stavka-table',
  templateUrl: './modal-add-stavka-table.component.html',
  styleUrls: ['./modal-add-stavka-table.component.css']
})
export class ModalAddStavkaTableComponent implements OnInit {

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

