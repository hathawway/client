import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Kafedra } from 'src/app/interfaces/interfaces';
import { KafedraService } from 'src/app/services/kafedra.service';

@Component({
  selector: 'app-modal-survey-schedule',
  templateUrl: './modal-survey-schedule.component.html',
  styleUrls: ['./modal-survey-schedule.component.css']
})
export class ModalSurveyScheduleComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  data$:Observable<Kafedra> | undefined;

  constructor(private kafedraService: KafedraService) { }
 
  ngOnInit(): void {

  }

  open(e:MouseEvent, kafedra: Kafedra) {
 
    this.visibility = "visible"
    this.data$ = this.kafedraService.getKafedraById(kafedra)
    this.form = new FormGroup({
      id: new FormControl(kafedra.id, Validators.required),
      norma: new FormControl(kafedra.norma, Validators.required),
      // name: new FormControl(kafedra.name, Validators.required)
    })
 
    e.stopPropagation()
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()

    // this.kafedraService.updateKafedra(this.form.value).subscribe(
    //   () => this.router.navigate(['/dashboard/zafkaf/schedule/']),
    //   error => {
    //     MaterialService.toast(error.error.message)
    //     this.form.enable()
    //   }
    // )

    this.form.enable()
    this.visibility = "hidden"
  }

}
