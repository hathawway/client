import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalRoleComponent } from '../modal-role/modal-role.component';
import { Router } from '@angular/router';
import { Auth } from './../../../services/auth';
import { Roles } from 'src/app/interfaces/interfaces';
import { User } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @ViewChild(ModalRoleComponent) menu:ModalRoleComponent

  users$: Observable<User> | undefined;

  roles$: Observable<Roles> | undefined;

  constructor(private auth: Auth, private router: Router) { }

  ngOnInit(): void {
    //this.roles$ = this.auth.getUserRole()
    this.users$ = this.auth.getUser()
    console.log(this.auth.getUser())
  }
 
  openMenu(e) {
    this.menu.open(e)
  }

  logout(event: Event): void {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
 
}
