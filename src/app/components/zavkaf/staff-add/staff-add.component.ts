import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalStaffEditComponent } from '../modal-staff-edit/modal-staff-edit.component';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.css']
})
export class StaffAddComponent implements OnInit {

  @ViewChild(ModalStaffEditComponent) menu:ModalStaffEditComponent 
 
  openMenu(e) {
    this.menu.open(e)
  }

  ngOnInit(): void {
    
  }


}
