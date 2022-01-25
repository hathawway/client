import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalRoleComponent } from '../modal-role/modal-role.component';
import { Router } from '@angular/router';
import { Auth } from './../../../services/auth';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @ViewChild(ModalRoleComponent) menu:ModalRoleComponent

  constructor(private auth: Auth,
    private router: Router) { }

  ngOnInit(): void {
    
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
