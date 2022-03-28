import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { KindActivityService } from 'src/app/services/kindActivity.service';
import { ModalAddKindActivityTableComponent } from '../modal-add-kind-activity-table/modal-add-kind-activity-table.component';
import { KindActivity } from './../../../interfaces/interfaces';

@Component({
  selector: 'app-kind-activity-table',
  templateUrl: './kind-activity-table.component.html',
  styleUrls: ['./kind-activity-table.component.css']
})
export class KindActivityTableComponent implements OnInit {

  @ViewChild(ModalAddKindActivityTableComponent) menu!:ModalAddKindActivityTableComponent 
  term!: string;
  data: Observable<KindActivity[]> | undefined;
 
  constructor(private kindActivityService: KindActivityService) {
    this.kindActivityService.onClick.subscribe(cnt=>this.data = cnt);
  }

    openMenuEdit(e, data:KindActivity) {
      this.menu.openEdit(e, data)
    }
  
    openMenuAdd(e) {
      this.menu.openAdd(e)
    }

    ngOnInit(): void {
      this.getData();  
    }
  
    getData() {
      this.kindActivityService.doClick()
    }

  delete(data:KindActivity) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.kindActivityService.deleteKindActivity(data).subscribe(
        () => this.getData(),
        error => {
          MaterialService.toast(error.error.message)
        }
      ) 
    }
  }


}
