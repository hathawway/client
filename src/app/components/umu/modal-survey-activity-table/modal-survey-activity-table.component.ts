import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity, NormaActivity } from 'src/app/interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';

@Component({
  selector: 'app-modal-survey-activity-table',
  templateUrl: './modal-survey-activity-table.component.html',
  styleUrls: ['./modal-survey-activity-table.component.css']
})
export class ModalSurveyActivityTableComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  activities$ : Observable<NormaActivity[]> | undefined;

  constructor(private normaService: NormaService) { }
 
  ngOnInit(): void {

  }

  open(e:MouseEvent, data: Activity) {
 
    this.visibility = "visible"
    this.activities$ = this.normaService.getNormaActivity()
    e.stopPropagation()
  }
 
  close() {
    this.visibility = "hidden"
  }

}
