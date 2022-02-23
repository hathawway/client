import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Activity } from 'src/app/interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';
import { ModalAddActivityTableComponent } from '../modal-add-activity-table/modal-add-activity-table.component';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.css']
})
export class ActivityTableComponent implements OnInit {

  @ViewChild(ModalAddActivityTableComponent) menu:ModalAddActivityTableComponent 

  term: string;
  data$: Observable<Activity[]> | undefined;

  constructor(private normaService: NormaService,
    private router: Router) {}
 
  openMenuAdd(e) {
    this.menu.openAdd(e)
  }

  openMenuEdit(e, data:Activity) {
    this.menu.openEdit(e, data)
  }

  ngOnInit(): void {
    this.data$ = this.normaService.getActivity()
  }

  delete(data:Activity) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.normaService.deleteActivity(data).subscribe(
        () => this.router.navigate(['/dashboard/umu/activity/']),
        error => {
          MaterialService.toast(error.error.message)
        }
      ) 
      window.location.reload() 
    }
  }

}