import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-staff-edit',
  templateUrl: './modal-staff-edit.component.html',
  styleUrls: ['./modal-staff-edit.component.css']
})
export class ModalStaffEditComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "900px"
 
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
