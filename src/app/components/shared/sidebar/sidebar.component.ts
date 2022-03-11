import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Auth } from 'src/app/services/auth';
import { User } from '../../../interfaces/interfaces'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  //user$: Observable<User> | undefined;

  // links = [  
  //   {url: '/dashboard/admin/office', name: 'Структурные подразделения'},
  //   {url: '/dashboard/admin/post', name: 'Должности'},
  //   {url: '/dashboard/admin/user', name: 'Пользователи'}
  // ]

  
  /*links = [  
    {url: '/dashboard/umu/kind-activity', name: 'Виды деятельности'},
    {url: '/dashboard/umu/norma-kind-activity', name: 'Нормы времени видов деятельности'},
    {url: '/dashboard/umu/activity', name: 'Виды работ внеучебной деятельности'},
    {url: '/dashboard/umu/stavka-shared', name: 'Нормы времени видов работ'},
    {url: '/dashboard/umu/unit', name: 'Единицы видов работ'},
    {url: '/dashboard/umu/stavka', name: 'Нормы времени учебной деятельности на ставку'},
    {url: '/dashboard/umu/maket', name: 'Макет ИП'}
  ]*/
  

  
  links = [  
    {role: 'zavkaf', url: '/dashboard/zavkaf/staff', name: 'Состав кафедры'},
    {role: 'zavkaf', url: '/dashboard/zavkaf/schedule', name: 'Штатное расписание'},
    {role: 'zavkaf', url: '/dashboard/zavkaf/ip', name: 'Индивидуальные планы'},
    {role: 'zavkaf', url: '/dashboard/zavkaf/report', name: 'Отчеты'},
    {role: 'pps', url: '/dashboard/pps/pp', name: 'Индивидуальные планы'},
    {role: 'pps', url: '/dashboard/pps/statistics', name: 'Статистика'}
  ]
  

  /*
  links = [  
    {url: '/dashboard/pps/pp', name: 'Индивидуальные планы'},
    {url: '/dashboard/pps/statistics', name: 'Статистика'}
  ]
  */

  /*
  links = [  
    {url: '/dashboard/curator/type-work', name: 'Работа'},
    {url: '/dashboard/curator/works', name: 'Мониторинг заполненого ИП'},
    {url: '/dashboard/curator/works-dane', name: 'Мониторинг выполненого ИП'}
  ]
  
*/
  role:string | undefined;

  constructor(private auth: Auth, private router: Router) { }

  ngOnInit(): void {
    /*this.user$ = this.auth.getUser()
    this.user$.subscribe(
      () => this.router.navigate([`${this.role}`])
    )*/


  }
  



}


