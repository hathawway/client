import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-ip-edit', 
  templateUrl: './modal-ip-edit.component.html',
  styleUrls: ['./modal-ip-edit.component.css']
})
export class ModalIpEditComponent implements OnInit {

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
