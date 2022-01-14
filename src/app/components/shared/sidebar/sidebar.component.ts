import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  /*links = [  
    {url: '/dashboard/admin/post', name: 'Структурные подразделения'},
    {url: '/dashboard/admin/office', name: 'Должности'},
    {url: '/dashboard/admin/user', name: 'Пользователи'}
  ]*/

  /*
  links = [  
    {url: '/dashboard/umu/kind-activity', name: 'Виды деятельности'},
    {url: '/dashboard/umu/activity', name: 'Виды работ'},
    {url: '/dashboard/umu/stavka', name: 'Количество часов на ставку'},
    {url: '/dashboard/umu/maket', name: 'Макет ИП'}
  ]
  */

  
  links = [  
    {url: '/dashboard/zavkaf/staff', name: 'Состав кафедры'},
    {url: '/dashboard/zavkaf/schedule', name: 'Штатное расписание'},
    {url: '/dashboard/zavkaf/ip', name: 'Индивидуальные планы'},
    {url: '/dashboard/zavkaf/report', name: 'Отчеты'}
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}


