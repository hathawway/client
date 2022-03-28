import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookUnit } from 'src/app/interfaces/interfaces';
import { UnitService } from 'src/app/services/unit.service';
import { ModalAddUnitComponent } from '../modal-add-unit/modal-add-unit.component';

@Component({
  selector: 'app-unit-table',
  templateUrl: './unit-table.component.html',
  styleUrls: ['./unit-table.component.css']
})
export class UnitTableComponent implements OnInit {

  @ViewChild(ModalAddUnitComponent) menu!:ModalAddUnitComponent 
 
  data: Observable<BookUnit[]> | undefined;
  term!: string;

  constructor(private unitService: UnitService) { 
      this.unitService.onClick.subscribe(cnt=>this.data = cnt);
    }

  openMenuEdit(e, data:BookUnit) {
    this.menu.openEdit(e, data)
  }

  openMenuAdd(e) {
    this.menu.openAdd(e)
  }

  ngOnInit(): void {
    this.getData();  
  }

  getData() {
    this.unitService.doClick()
  }
  

  delete(data:BookUnit) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.unitService.deleteBookUnit(data).subscribe(
        () => this.getData(),
        error => {
          MaterialService.toast(error.error.message)
        }
      ) 
    }
  }

}

