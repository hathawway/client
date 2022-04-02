import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IpKafedra, IpPps } from 'src/app/interfaces/interfaces';
import { IpKafedraService } from 'src/app/services/ip.service';
import { ModalPpEditComponent } from '../modal-pp-edit/modal-pp-edit.component';

@Component({
  selector: 'app-pp',
  templateUrl: './pp.component.html',
  styleUrls: ['./pp.component.css']
})
export class PpComponent implements OnInit {

  @ViewChild(ModalPpEditComponent) menu!:ModalPpEditComponent 

  term!: string;
  data: Observable<IpKafedra[]> | undefined;

  constructor(private ipKafedraService: IpKafedraService) {
      this.ipKafedraService.onClick.subscribe(cnt=>this.data = cnt);
    }

  openMenuEdit(e, ip: IpPps) {
    this.menu.openEdit(e, ip)
  }

  openMenuAdd(e) {
    this.menu.openAdd(e)
  }

  ngOnInit(): void {
    this.getData();  
  }

  getData() {
    this.ipKafedraService.doClick()
  }

  delete(ip:IpPps) {

  }

}
