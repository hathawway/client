import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { NormaActivity} from './../../../interfaces/interfaces';
import { ModalAddStavkaSharedComponent } from '../modal-add-stavka-shared/modal-add-stavka-shared.component';
import { NormaActivityService } from 'src/app/services/normaActivity.service';

@Component({
  selector: 'app-stavka-shared',
  templateUrl: './stavka-shared.component.html',
  styleUrls: ['./stavka-shared.component.css']
})
export class StavkaSharedComponent implements OnInit {

  @ViewChild(ModalAddStavkaSharedComponent) menu!:ModalAddStavkaSharedComponent
  term!: string;
  data: Observable<NormaActivity[]> | undefined;
 
  constructor(private normaActivityService: NormaActivityService) {
      this.normaActivityService.onClick.subscribe(cnt=>this.data = cnt);
    }

    openMenuEdit(e, data:NormaActivity) {

      this.menu.openEdit(e, data)
    }
  
    openMenuAdd(e) {
      this.menu.openAdd(e)
    }

    ngOnInit(): void {
      this.getData();  
    }
  
    getData() {
      this.normaActivityService.doClick()
    }

    delete(data:NormaActivity) {
      const decision = window.confirm("Удалить?")
      if (decision) {
        this.normaActivityService.deleteNormaActivity(data).subscribe(
          () =>  this.getData(),
          error => {
            MaterialService.toast(error.error.message)
          }
        ) 
      }
    }


}
