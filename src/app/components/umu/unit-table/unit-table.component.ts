import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookUnit } from 'src/app/interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';
import { ModalAddUnitComponent } from '../modal-add-unit/modal-add-unit.component';

@Component({
  selector: 'app-unit-table',
  templateUrl: './unit-table.component.html',
  styleUrls: ['./unit-table.component.css']
})
export class UnitTableComponent implements OnInit {

  @ViewChild(ModalAddUnitComponent) menu:ModalAddUnitComponent 
 
  data$: Observable<BookUnit[]> | undefined;
  term: string;

  constructor(private normaService: NormaService,
    private router: Router) { }

  openMenuEdit(e, data:BookUnit) {
    this.menu.openEdit(e, data)
  }

  openMenuAdd(e) {
    this.menu.openAdd(e)
  }

  ngOnInit(): void {
    this.data$ = this.normaService.getBookUnit()
  }


  delete(data:BookUnit) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.normaService.deleteBookUnit(data).subscribe(
        () => this.router.navigate(['/dashboard/umu/unit/']),
        (        error: { error: { message: any; }; }) => {
          MaterialService.toast(error.error.message)
        }
      ) 
      window.location.reload() 
    }
  }

}

