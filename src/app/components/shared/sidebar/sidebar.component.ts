import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  links = [  
    {url: '/post', name: 'Структурные подразделения'},
    {url: '/office', name: 'Должности'},
    {url: '/user', name: 'Пользователи'}
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
