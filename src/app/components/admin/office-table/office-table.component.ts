import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  @ViewChild(ModalAddOfficeTableComponent) menu:ModalAddOfficeTableComponent 
 
  offices$: Observable<BookOffice[]> | undefined;

  constructor(private officeService: OfficeService,
    private router: Router) { }

  openMenu(e) {
    this.menu.open(e)
  }

  ngOnInit(): void {
    this.offices$ = this.officeService.getOffice()
  }


  delete(id:string) {
    const decision = window.confirm("Удалить?")
    console.log(id)
    if (decision) {
      this.officeService.deleteOffice(id).subscribe()
    }
  }


}
