import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  num: number = 0;

  links = [  
    {id: 1, url: '/dashboard/admin/office', name: 'Структурные подразделения'},
    {id: 1, url: '/dashboard/admin/post', name: 'Должности'},
    {id: 1, url: '/dashboard/admin/user', name: 'Пользователи'},
    {id: 2, url: '/dashboard/umu/stavka', name: 'Нормы времени учебной деятельности на ставку'},
    {id: 2, url: '/dashboard/umu/kind-activity', name: 'Виды деятельности'},
    {id: 2, url: '/dashboard/umu/norma-kind-activity', name: 'Нормы времени видов деятельности'},
    {id: 2, url: '/dashboard/umu/activity', name: 'Виды работ внеучебной деятельности'},
    {id: 2, url: '/dashboard/umu/unit', name: 'Единицы видов работ'},
    {id: 2, url: '/dashboard/umu/maket', name: 'Макет ИП'},
    {id: 3,  url: '/dashboard/zavkaf/staff', name: 'Сотрудники вуза'},
    {id: 3,  url: '/dashboard/zavkaf/schedule', name: 'Штатное расписание'},
    {id: 3,  url: '/dashboard/zavkaf/ip', name: 'Индивидуальные планы'},
    {id: 3,  url: '/dashboard/zavkaf/report', name: 'Отчеты'},
    {id: 4,  url: '/dashboard/pps/pp', name: 'Индивидуальные планы'},
    {id: 4,  url: '/dashboard/pps/statistics', name: 'Статистика'},
    {id: 4,  url: '/dashboard/pps/edit-pp', name: 'Добавить ИП'},
    {id: 5, url: '/dashboard/curator/type-work', name: 'Работа'},
    {id: 5, url: '/dashboard/curator/works', name: 'Мониторинг заполненого ИП'},
    {id: 5, url: '/dashboard/curator/works-done', name: 'Мониторинг выполненого ИП'}
  ]

  constructor(private role: RoleService) { 
      this.role.onClick.subscribe(cnt=>this.num = cnt);
  }

  ngOnInit(): void {

  }
  
}


