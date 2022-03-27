import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';
import { Role, User } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  users$: Observable<User> | undefined;

  roles$: Observable<Role[]> | undefined;

  num: number = 0;

  link = [  
    {id: 1, url: '/dashboard/admin'},
    {id: 2, url: '/dashboard/umu/'},
    {id: 3, url: '/dashboard/zavkaf'},
    {id: 4, url: '/dashboard/pps'},
    {id: 5, url: '/dashboard/curator'}
  ]

  constructor(private auth: Auth,
    private role: RoleService, private router: Router) { 
      this.role.onClick.subscribe(cnt => this.num = cnt);
    }

  ngOnInit(): void {
    this.users$ = this.auth.getUserByHeader()
    this.roles$ = this.role.getUserRole()
  }

  logout(event: Event): void {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  onSelect(id: number) {
    this.role.doClick(id);
  }
 
}
