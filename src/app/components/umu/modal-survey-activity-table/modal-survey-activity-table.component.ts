import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity, NormaActivity } from 'src/app/interfaces/interfaces';
import { NormaActivityService } from 'src/app/services/normaActivity.service';

@Component({
  selector: 'app-modal-survey-activity-table',
  templateUrl: './modal-survey-activity-table.component.html',
  styleUrls: ['./modal-survey-activity-table.component.css']
})
export class ModalSurveyActivityTableComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  activities$ : Observable<NormaActivity[]> | undefined;

  constructor(private normaActivityService: NormaActivityService) { }
 
  ngOnInit(): void {

  }

  open(e:MouseEvent, data: Activity) {
 
    this.visibility = "visible"
    this.activities$ = this.normaActivityService.getNormaActivityByActivity(data)
    e.stopPropagation()
  }
 
  close() {
    this.visibility = "hidden"
  }

}
