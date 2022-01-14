import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAddOfficeTableComponent } from '../modal-add-office-table/modal-add-office-table.component';

@Component({
  selector: 'app-office-table',
  templateUrl: './office-table.component.html',
  styleUrls: ['./office-table.component.css']
})
export class OfficeTableComponent implements OnInit {

  @ViewChild(ModalAddOfficeTableComponent) menu:ModalAddOfficeTableComponent 
 
  openMenu(e) {
    this.menu.open(e)
  }

  ngOnInit(): void {
    
  }


}
