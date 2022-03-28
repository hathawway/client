import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { NormaStudy, StavkaYear } from 'src/app/interfaces/interfaces';
import { NormaStudyService } from 'src/app/services/normaStudy.service';
import { StavkaYearService } from 'src/app/services/stavkaYear.service';
import { ModalAddStavkaTableComponent } from '../modal-add-stavka-table/modal-add-stavka-table.component';
import { ModalEditStavkaComponent } from '../modal-edit-stavka/modal-edit-stavka.component';

@Component({
  selector: 'app-stavka-table',
  templateUrl: './stavka-table.component.html',
  styleUrls: ['./stavka-table.component.css']
})
export class StavkaTableComponent implements OnInit {

  @ViewChild(ModalAddStavkaTableComponent) menu!:ModalAddStavkaTableComponent 
  @ViewChild(ModalEditStavkaComponent) norma!:ModalEditStavkaComponent 

  term!: string;
  form!: FormGroup;
  data: Observable<NormaStudy[]> | undefined;
  norma$: Observable<StavkaYear> | undefined;
 
  constructor(private normaStudyService: NormaStudyService, 
    private stavkaYearService: StavkaYearService) {
    this.normaStudyService.onClick.subscribe(cnt=>this.data = cnt);
  }

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
      this.getData();  
      this.norma$ = this.stavkaYearService.getStavkaYearOne();
    }
  
    getData() {
      this.normaStudyService.doClick()
    }

    delete(data:NormaStudy) {
      const decision = window.confirm("Удалить?")
      if (decision) {
        this.normaStudyService.deleteNormaStudy(data).subscribe(
          () => this.getData(),
          error => {
            MaterialService.toast(error.error.message)
          }
        ) 
      }
    }


}
