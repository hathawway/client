import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private noti: NotiService) {
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
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.ipService.deleteIp(data).subscribe(
        () => this.getData(),
        error => {
          this.noti.toast(error.error.message)
        }
      ) 
    }
  }

  edit(id:string) {
    console.log(id)
    this.ipPpsService.setId(id);
    this.router.navigate([`/dashboard/pps/edit-pp`])
  }

  add() {
    this.ipPpsService.setId("");
    this.router.navigate([`/dashboard/pps/edit-pp`])
  }

}
