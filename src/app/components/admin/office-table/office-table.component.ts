import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookOffice } from 'src/app/interfaces/interfaces';
import { OfficeService } from 'src/app/services/office.service';
import { ModalAddOfficeTableComponent } from '../modal-add-office-table/modal-add-office-table.component';

@Component({
  selector: 'app-office-table',
  templateUrl: './office-table.component.html',
  styleUrls: ['./office-table.component.css']
})
export class OfficeTableComponent implements OnInit {

  @ViewChild(ModalAddOfficeTableComponent) menu!: ModalAddOfficeTableComponent; 
  
  term!: string;
  data: Observable<BookOffice[]> | undefined;

  constructor(private officeService: OfficeService) {   
      this.officeService.onClick.subscribe(cnt=>this.data = cnt);
  }

  openMenuEdit(e, office:BookOffice) {
    this.menu.openEdit(e, office)
  }

  openMenuAdd(e) {
    this.menu.openAdd(e);
  }

  ngOnInit(): void {
    this.getData();  
  }

  getData() {
    this.officeService.doClick()
  }


  delete(office:BookOffice) {
    const decision = window.confirm("Удалить?")
      if (decision) {
        this.officeService.deleteOffice(office).subscribe(
          () => this.getData(),
          error => {
            MaterialService.toast(error.error.message)
          }
        ) 
      }
    }

}


