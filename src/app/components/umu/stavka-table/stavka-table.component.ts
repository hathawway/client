import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { NormaStudy, StavkaYear } from 'src/app/interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';
import { ModalAddStavkaTableComponent } from '../modal-add-stavka-table/modal-add-stavka-table.component';
import { ModalEditStavkaComponent } from '../modal-edit-stavka/modal-edit-stavka.component';

@Component({
  selector: 'app-stavka-table',
  templateUrl: './stavka-table.component.html',
  styleUrls: ['./stavka-table.component.css']
})
export class StavkaTableComponent implements OnInit {

  @ViewChild(ModalAddStavkaTableComponent) menu:ModalAddStavkaTableComponent 
  @ViewChild(ModalEditStavkaComponent) norma:ModalEditStavkaComponent 

  term: string;
  form!: FormGroup;
  data$: Observable<NormaStudy[]> | undefined;
  norma$: Observable<StavkaYear> | undefined;
 
  constructor(private normaService: NormaService,
    private router: Router) {}

    openMenuEdit(e, data:NormaStudy) {

      this.menu.openEdit(e, data)
    }
  
    openMenuAdd(e) {
      this.menu.openAdd(e)
    }

    openNormaEdit(e, norma: StavkaYear) {
      this.norma.open(e, norma)
    }

    ngOnInit(): void {
      this.data$ = this.normaService.getNormaStudy()
      this.norma$ = this.normaService.getStavkaYearOne()
    }

    delete(data:NormaStudy) {
      const decision = window.confirm("Удалить?")
      if (decision) {
        this.normaService.deleteNormaStudy(data).subscribe(
          () => this.router.navigate(['/dashboard/umu/stavka/']),
          error => {
            MaterialService.toast(error.error.message)
          }
        ) 
        window.location.reload() 
      }
    }


}
