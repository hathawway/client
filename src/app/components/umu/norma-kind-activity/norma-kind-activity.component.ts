import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { NormaKindActivity } from 'src/app/interfaces/interfaces';
import { NormaKindActivityService } from 'src/app/services/normaKindActivity.service';
import { ModalAddNormaKindActivityComponent } from '../modal-add-norma-kind-activity/modal-add-norma-kind-activity.component';

@Component({
  selector: 'app-norma-kind-activity',
  templateUrl: './norma-kind-activity.component.html',
  styleUrls: ['./norma-kind-activity.component.css']
})
export class NormaKindActivityComponent implements OnInit {

  @ViewChild(ModalAddNormaKindActivityComponent) menu!:ModalAddNormaKindActivityComponent

  term!: string;
  data: Observable<NormaKindActivity[]> | undefined;
 
  constructor(private normaKindActivityService: NormaKindActivityService) {
    this.normaKindActivityService.onClick.subscribe(cnt=>this.data = cnt);
  }

    openMenuEdit(e, data:NormaKindActivity) {

      this.menu.openEdit(e, data)
    }
  
    openMenuAdd(e) {
      this.menu.openAdd(e)
    }

    ngOnInit(): void {
      this.getData();  
    }
  
    getData() {
      this.normaKindActivityService.doClick()
    }

    delete(data:NormaKindActivity) {
      const decision = window.confirm("Удалить?")
      if (decision) {
        this.normaKindActivityService.deleteNormaKindActivity(data).subscribe(
          () => this.getData(),
          error => {
            MaterialService.toast(error.error.message)
          }
        ) 
      }
    }


}
