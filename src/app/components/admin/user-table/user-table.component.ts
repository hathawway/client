import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth';
import { ModalAddUserComponent } from '../modal-add-user/modal-add-user.component';
import { ModalSurveyUserComponent } from '../modal-survey-user/modal-survey-user.component';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

 
  @ViewChild(ModalAddUserComponent) menu!:ModalAddUserComponent 
  @ViewChild(ModalSurveyUserComponent) table!:ModalSurveyUserComponent 

  data: Observable<User[]> | undefined;
  term!: string;

  constructor(private authService: AuthService) {
      this.authService.onClick.subscribe(cnt=>this.data = cnt);
  }
 
  openMenuAdd(e) {
    this.menu.openAdd(e)
  }

  openMenuEdit(e, user:User) {
    this.menu.openEdit(e, user)
  }

  openMenuSurvey(e, user:User) {
    this.table.openSurvey(e, user)
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.authService.doClick()
  }

  delete(user:User) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.authService.deleteUser(user).subscribe(
        () => this.getData(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )    
    }
  }

}
