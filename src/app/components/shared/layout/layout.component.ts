import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Role, User } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
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
  ]

  constructor(private auth: AuthService,
    private role: RoleService, private router: Router) {
    }

  ngOnInit(): void {
    this.users$ = this.auth.getUserByHeader()
    this.roles$ = this.role.getCurrentUserRoles()
    this.roles$.subscribe(value => {
      this.router.navigate([this.url(value[0].book_role.id)])
    })
  }

  logout(event: Event): void {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  onSelect(id: string) {
    this.role.doClick(Number(id));
  }

  url(id: string) {
    return this.link.find( (l) => l.id.toString() === id)?.url
  }

}
