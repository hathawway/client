import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Office } from 'src/app/interfaces/interfaces';
import { OfficeService } from 'src/app/services/office.service';
import { ModalAddOfficeTableComponent } from '../modal-add-office-table/modal-add-office-table.component';

@Component({
  selector: 'app-office-table',
  templateUrl: './office-table.component.html',
  styleUrls: ['./office-table.component.css']
})
export class OfficeTableComponent implements OnInit {

  @ViewChild(ModalAddOfficeTableComponent) menu:ModalAddOfficeTableComponent 
 
  offices$: Observable<Office[]> | undefined

  constructor(private officeService: OfficeService) { }

  openMenu(e) {
    this.menu.open(e)
  }

  ngOnInit(): void {
    this.offices$ = this.officeService.getOffice()
  }

  delete() {
    
  }


}
