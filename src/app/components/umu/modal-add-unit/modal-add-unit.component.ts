import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookUnit } from 'src/app/interfaces/interfaces';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-modal-add-unit',
  templateUrl: './modal-add-unit.component.html',
  styleUrls: ['./modal-add-unit.component.css']
})
export class ModalAddUnitComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;
  data: Observable<BookUnit[]> | undefined;


  constructor(private unitService : UnitService) {
    this.unitService.onClick.subscribe(cnt => this.data = cnt);
   }
 
  ngOnInit() {

  }

  openEdit(e:MouseEvent, data:BookUnit) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      name: new FormControl(data.name, Validators.required)
    })
    e.stopPropagation()    
  }

  openAdd(e:MouseEvent) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.flag = true;
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    if (this.flag) {
      this.unitService.addBookUnit(this.form.value).subscribe(
        () => this.unitService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }
    else {
      this.unitService.updateBookUnit(this.form.value).subscribe(
        () => this.unitService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }            
    this.form.enable()
    this.flag = false;
    this.visibility = "hidden"

    
  }

}
