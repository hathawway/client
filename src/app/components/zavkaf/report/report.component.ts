import { Component, OnInit } from '@angular/core';
import { NotiService } from 'src/app/utils/noti.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {

  constructor(private noti: NotiService) { }

  ngOnInit(): void {
  }

}
