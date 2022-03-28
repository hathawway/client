import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { StavkaYear } from 'src/app/interfaces/interfaces';
import { StavkaYearService } from 'src/app/services/stavkaYear.service';

@Component({
  selector: 'app-modal-edit-stavka',
  templateUrl: './modal-edit-stavka.component.html',
  styleUrls: ['./modal-edit-stavka.component.css']
})
export class ModalEditStavkaComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  data: Observable<StavkaYear> | undefined;


  constructor(private stavkaYearService : StavkaYearService) { 
    this.stavkaYearService.onClick.subscribe(cnt => this.data = cnt);
  }

  ngOnInit(): void {
  }

  open(e:MouseEvent, norma: StavkaYear) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(norma.id, Validators.required),
      norma: new FormControl(norma.norma, Validators.required)
    })
    e.stopPropagation()    
  }

 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    this.stavkaYearService.updateStavkaYear(this.form.value).subscribe(
        () => this.stavkaYearService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
    )          
    this.form.enable()
    this.visibility = "hidden"
  }
    
}