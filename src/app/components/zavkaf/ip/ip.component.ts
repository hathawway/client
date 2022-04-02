import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IpKafedra } from 'src/app/interfaces/interfaces';
import { IpKafedraService } from 'src/app/services/ip.service';
import { ModalIpEditComponent } from '../modal-ip-edit/modal-ip-edit.component';

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.css']
})
export class IpComponent implements OnInit {

  @ViewChild(ModalIpEditComponent) menu!:ModalIpEditComponent 

  term!: string;
  data: Observable<IpKafedra[]> | undefined;

  constructor(private ipKafedraService: IpKafedraService) {
      this.ipKafedraService.onClick.subscribe(cnt=>this.data = cnt);
    }

  openMenu(e, ip: IpKafedra) {
    this.menu.open(e, ip)
  }

  ngOnInit(): void {
    this.getData();  
  }

  getData() {
    this.ipKafedraService.doClick()
  }


}
