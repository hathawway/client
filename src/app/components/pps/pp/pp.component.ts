import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Ip } from 'src/app/interfaces/interfaces';
import { IpPpsService } from 'src/app/services/pps.service';
import { ModalPpEditComponent } from '../modal-pp-edit/modal-pp-edit.component';

@Component({
  selector: 'app-pp',
  templateUrl: './pp.component.html',
  styleUrls: ['./pp.component.css']
})
export class PpComponent implements OnInit {

  @ViewChild(ModalPpEditComponent) menu!:ModalPpEditComponent 

  term!: string;
  data: Observable<Ip[]> | undefined;

  constructor(private ipPpsService: IpPpsService) {
      this.ipPpsService.onClick.subscribe(cnt=>this.data = cnt);
    }

  openMenuEdit(e, ip: Ip) {
    this.menu.openEdit(e, ip)
  }

  openMenuAdd(e) {
    this.menu.openAdd(e)
  }

  ngOnInit(): void {
    this.getData();  
  }

  getData() {
    this.ipPpsService.doClick()
  }

  delete(ip:Ip) {

  }

}
