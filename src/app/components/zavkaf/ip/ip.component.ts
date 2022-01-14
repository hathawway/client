import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalIpEditComponent } from '../modal-ip-edit/modal-ip-edit.component';

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.css']
})
export class IpComponent implements OnInit {

  @ViewChild(ModalIpEditComponent) menu:ModalIpEditComponent 

  openMenu(e) {
    this.menu.open(e)
  }

  ngOnInit(): void {
    
  }

}
