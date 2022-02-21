import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { StavkaYear } from './../../../interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';
import { ModalAddStavkaSharedComponent } from '../modal-add-stavka-shared/modal-add-stavka-shared.component';

@Component({
  selector: 'app-stavka-shared',
  templateUrl: './stavka-shared.component.html',
  styleUrls: ['./stavka-shared.component.css']
})
export class StavkaSharedComponent implements OnInit {

  @ViewChild(ModalAddStavkaSharedComponent) menu:ModalAddStavkaSharedComponent
  term: string;
  data$: Observable<StavkaYear[]> | undefined;
 
  constructor(private normaService: NormaService,
    private router: Router) {}

    openMenuEdit(e, data:StavkaYear) {

      this.menu.openEdit(e, data)
    }
  
    openMenuAdd(e) {
      this.menu.openAdd(e)
    }

    ngOnInit(): void {
      this.data$ = this.normaService.getStavkaYear()
    }

    delete(data:StavkaYear) {
      const decision = window.confirm("Удалить?")
      if (decision) {
        this.normaService.deleteStavkaYear(data).subscribe(
          () => this.router.navigate(['/dashboard/umu/stavka-shared/']),
          error => {
            MaterialService.toast(error.error.message)
          }
        ) 
        window.location.reload() 
      }
    }


}
