import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Activity } from 'src/app/interfaces/interfaces';
import { ActivityService } from 'src/app/services/activity.service';
import { ModalAddActivityTableComponent } from '../modal-add-activity-table/modal-add-activity-table.component';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.css']
})
export class ActivityTableComponent implements OnInit {

  @ViewChild(ModalAddActivityTableComponent) menu!:ModalAddActivityTableComponent 

  term!: string;
  data: Observable<Activity[]> | undefined;

  constructor(private activityService: ActivityService) {
      this.activityService.onClick.subscribe(cnt=>this.data = cnt);
    }
 
  openMenuAdd(e) {
    this.menu.openAdd(e)
  }

  openMenuEdit(e, data:Activity) {
    this.menu.openEdit(e, data)
  }

  ngOnInit(): void {
    this.getData();  
  }

  getData() {
    this.activityService.doClick()
  }

  delete(data:Activity) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.activityService.deleteActivity(data).subscribe(
        () => this.getData(),
        error => {
          MaterialService.toast(error.error.message)
        }
      ) 
    }
  }

}