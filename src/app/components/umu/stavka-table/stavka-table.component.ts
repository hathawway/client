import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAddStavkaTableComponent } from '../modal-add-stavka-table/modal-add-stavka-table.component';

@Component({
  selector: 'app-stavka-table',
  templateUrl: './stavka-table.component.html',
  styleUrls: ['./stavka-table.component.css']
})
export class StavkaTableComponent implements OnInit {

  @ViewChild(ModalAddStavkaTableComponent) menu:ModalAddStavkaTableComponent 
 
  openMenu(e) {
    this.menu.open(e)
  }

  ngOnInit(): void {
    
  }


}
