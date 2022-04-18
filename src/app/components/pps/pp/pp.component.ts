import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Ip } from 'src/app/interfaces/interfaces';
import { IpService } from 'src/app/services/ip.service';

@Component({
  selector: 'app-pp',
  templateUrl: './pp.component.html',
  styleUrls: ['./pp.component.css']
})
export class PpComponent implements OnInit {

  term!: string;
  data: Observable<Ip[]> | undefined;

  constructor(private ipService: IpService) {
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
      this.ipService.deleteIp(data, "all").subscribe(
        () => this.getData(),
        error => {
          MaterialService.toast(error.error.message)
        }
      ) 
    }
  }

  edit(id:string) {
    this.ipService.setId(id);
  }

}
