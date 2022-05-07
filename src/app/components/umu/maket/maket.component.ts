import { Component, OnInit } from '@angular/core';
import { NotiService } from 'src/app/utils/noti.service';

@Component({
  selector: 'app-maket',
  templateUrl: './maket.component.html',
  styleUrls: ['./maket.component.less']
})
export class MaketComponent implements OnInit {

  constructor(private noti: NotiService) { }

  ngOnInit(): void {
  }

}
