import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { NormaService } from 'src/app/services/norma.service';
import { ModalAddKindActivityTableComponent } from '../modal-add-kind-activity-table/modal-add-kind-activity-table.component';
import { KindActivity } from './../../../interfaces/interfaces';

@Component({
  selector: 'app-kind-activity-table',
  templateUrl: './kind-activity-table.component.html',
  styleUrls: ['./kind-activity-table.component.css']
})
export class KindActivityTableComponent implements OnInit {

  @ViewChild(ModalAddKindActivityTableComponent) menu:ModalAddKindActivityTableComponent 
  term: string;
  data$: Observable<KindActivity[]> | undefined;
 
  constructor(private normaService: NormaService,
    private router: Router) {}

    openMenuEdit(e, data:KindActivity) {
      this.menu.openEdit(e, data)
    }
  
    openMenuAdd(e) {
      this.menu.openAdd(e)
    }

  ngOnInit(): void {
    this.data$ = this.normaService.getKindActivity()
  }

  delete(data:KindActivity) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.normaService.deleteKindActivity(data).subscribe(
        () => this.router.navigate(['/dashboard/umu/kind-activity/']),
        error => {
          MaterialService.toast(error.error.message)
        }
      ) 
      window.location.reload() 
    }
  }


}
