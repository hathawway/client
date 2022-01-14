import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAddUserComponent } from '../modal-add-user/modal-add-user.component';
import { ModalSurveyUserComponent } from '../modal-survey-user/modal-survey-user.component';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

 
  @ViewChild(ModalAddUserComponent) menu:ModalAddUserComponent 
  @ViewChild(ModalSurveyUserComponent) table:ModalSurveyUserComponent 
 
  openMenu(e) {
    this.menu.open(e)
  }

  openTable(e) {
    this.table.open(e)
  }

  ngOnInit(): void {
    
  }

}
