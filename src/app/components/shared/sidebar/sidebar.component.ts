import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export const links = [
  {
    url: '/dashboard/admin',
    resources: [
      {resourceName: 'office', displayedName: 'Структурные подразделения'},
      {resourceName: 'post',   displayedName: 'Должности'},
      {resourceName: 'user',   displayedName: 'Пользователи'},
    ],
  },
  {
    url: '/dashboard/umu',
    resources: [
      {resourceName: 'stavka',              displayedName: 'Нормы времени учебной деятельности на ставку'},
      {resourceName: 'kind-activity',       displayedName: 'Виды деятельности'},
      {resourceName: 'norma-kind-activity', displayedName: 'Нормы времени видов деятельности'},
      {resourceName: 'activity',            displayedName: 'Виды работ внеучебной деятельности'},
      {resourceName: 'unit',                displayedName: 'Единицы видов работ'},
      //{url: '/dashboard/umu/maket', name: 'Макет ИП'},
    ],
  },
  {
    url: '/dashboard/zavkaf',
    resources: [
      {resourceName: 'staff',    displayedName: 'Сотрудники вуза'},
      {resourceName: 'schedule', displayedName: 'Штатное расписание'},
      {resourceName: 'ip',       displayedName: 'Индивидуальные планы'},
      // {resourceName: 'report',   displayedName: 'Отчеты'},
    ],
  },
  {
    url: '/dashboard/pps',
    resources: [
      {resourceName: 'pp',          displayedName: 'Индивидуальные планы'},
      // {resourceName: 'statistics',  displayedName: 'Статистика'},
    ]
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  idRole: number = -1;

 

  links = links;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.links.forEach( (link, i) => {
      if (this.router.url.includes(link.url)) {
        this.idRole = Number(i);
      }
    })

    // for (let i in this.links) {
    //   if (this.router.url.includes(this.links[i].url)) {
    //     this.idRole = Number(i);
    //     break;
    //   }
    // }
  }
}


