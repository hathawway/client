import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IpService } from 'src/app/services/ip.service';
import { NotiService } from 'src/app/utils/noti.service';
import {PpStatistic} from "../../../interfaces/interfaces";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {

  term!: string;
  form!: FormGroup;
  data$!: Observable<void>;

  constructor(private noti: NotiService,
    private ipService: IpService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      dataStart: new FormControl(null),
      dataEnd: new FormControl(null)
    })
  }

  onSubmit() {
    this.data$ = this.ipService.getStatistika(this.form.value)
    this.data$.subscribe((res)=> console.log(res))
  }

}
