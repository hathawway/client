import { Component, OnInit } from '@angular/core';
import { NotiService } from 'src/app/utils/noti.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less']
})
export class StatisticsComponent implements OnInit {

  constructor(private noti: NotiService) { }

  ngOnInit(): void {
  }

}
