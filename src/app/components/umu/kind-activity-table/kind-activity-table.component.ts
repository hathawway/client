import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAddKindActivityTableComponent } from '../modal-add-kind-activity-table/modal-add-kind-activity-table.component';

@Component({
  selector: 'app-kind-activity-table',
  templateUrl: './kind-activity-table.component.html',
  styleUrls: ['./kind-activity-table.component.css']
})
export class KindActivityTableComponent implements OnInit {

  @ViewChild(ModalAddKindActivityTableComponent) menu:ModalAddKindActivityTableComponent 
 
  openMenu(e) {
    this.menu.open(e)
  }

  ngOnInit(): void {
    
  }


}
