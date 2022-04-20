import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Ip } from 'src/app/interfaces/interfaces';
import { IpService } from 'src/app/services/ip.service';
import { ModalIpEditComponent } from '../modal-ip-edit/modal-ip-edit.component';

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.css']
})
export class IpComponent implements OnInit {

  @ViewChild(ModalIpEditComponent) menu!:ModalIpEditComponent 

  term!: string;
  data: Observable<Ip[]> | undefined;

  constructor(private ipService: IpService) {
      this.ipService.onClick.subscribe(cnt=>this.data = cnt);
    }

  openMenu(e, ip: Ip) {
    this.menu.open(e, ip)
  }

  ngOnInit(): void {   
    this.getData();  
  }

  getData() {
    this.ipService.setReqSearch("office")
    this.ipService.doClick()
  }


}
