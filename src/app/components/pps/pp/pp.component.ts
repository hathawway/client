import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { Ip } from 'src/app/interfaces/interfaces';
import { IpService } from 'src/app/services/ip.service';
import { IpPpsService } from 'src/app/services/ipPps.service';
import { NotiService } from 'src/app/utils/noti.service';

@Component({
  selector: 'app-pp',
  templateUrl: './pp.component.html',
  styleUrls: ['./pp.component.less']
})
export class PpComponent implements OnInit {

  term!: string;
  data: Observable<Ip[]> | undefined;

  constructor(private ipService: IpService,
              private ipPpsService: IpPpsService,
              private router: Router,
              private noti: NotiService,
              @Inject(TuiAlertService)
              private readonly alertService: TuiAlertService,) {
    this.ipService.onClick.subscribe(cnt=>this.data = cnt);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.ipService.setReqSearch("user")
    this.ipService.doClick()
  }

  delete(data:Ip) {
    const decision = window.confirm("РЈРґР°Р»РёС‚СЊ?")
    if (decision) {
      this.ipService.deleteIp(data).subscribe(
        () => this.getData(),
        error => {
          this.noti.toast(error.error.message)
        }
      )
    }
  }

  download(id:string) {
    this.ipService.download(id).subscribe((res)=>{
        const a = document.createElement('a');
        a.href = URL.createObjectURL(res)
        a.download = 'othcet.docx'
        a.click()
    },
      (error) => {
        this.noti.toast(JSON.parse(this.ipService.blobToString(error.error)))
        //this.noti.toast(error.error.message)
      }
    )
  }

  edit(id:string) {
    this.ipPpsService.setId(id);
    this.router.navigate([`/dashboard/pps/edit-pp`])
  }

  add() {
    this.ipPpsService.setId("");
    this.router.navigate([`/dashboard/pps/edit-pp`])
  }

}
