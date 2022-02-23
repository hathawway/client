import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { NormaKindActivity } from 'src/app/interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';
import { ModalAddNormaKindActivityComponent } from '../modal-add-norma-kind-activity/modal-add-norma-kind-activity.component';

@Component({
  selector: 'app-norma-kind-activity',
  templateUrl: './norma-kind-activity.component.html',
  styleUrls: ['./norma-kind-activity.component.css']
})
export class NormaKindActivityComponent implements OnInit {

  @ViewChild(ModalAddNormaKindActivityComponent) menu:ModalAddNormaKindActivityComponent

  term: string;
  data$: Observable<NormaKindActivity[]> | undefined;
 
  constructor(private normaService: NormaService,
    private router: Router) {}

    openMenuEdit(e, data:NormaKindActivity) {

      this.menu.openEdit(e, data)
    }
  
    openMenuAdd(e) {
      this.menu.openAdd(e)
    }

    ngOnInit(): void {
      this.data$ = this.normaService.getNormaKindActivity()
      console.log(this.normaService.getNormaKindActivity())
    }

    delete(data:NormaKindActivity) {
      const decision = window.confirm("Удалить?")
      if (decision) {
        this.normaService.deleteNormaKindActivity(data).subscribe(
          () => this.router.navigate(['/dashboard/umu/norma-kind-activity/']),
          error => {
            MaterialService.toast(error.error.message)
          }
        ) 
        window.location.reload() 
      }
    }


}
