import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/interfaces';
import { Auth } from 'src/app/services/auth';
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

  users$: Observable<User[]> | undefined

  constructor(private authService: Auth) { }
 
  openMenu(e) {
    this.menu.open(e)
  }

  openTable(e) {
    this.table.open(e)
  }

  ngOnInit(): void {
    this.users$ = this.authService.getUser()
  }

  delete(user:User) {
    const decision = window.confirm("Удалить?")
    console.log(user.id)
    if (decision) {
      this.users$ = this.authService.deleteUser(user)
      
    }
  }

}
