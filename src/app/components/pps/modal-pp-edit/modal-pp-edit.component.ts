import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { IpPps } from 'src/app/interfaces/interfaces';
import { IpPpsService } from 'src/app/services/pp.service';

@Component({
  selector: 'app-modal-pp-edit',
  templateUrl: './modal-pp-edit.component.html',
  styleUrls: ['./modal-pp-edit.component.css']
})
export class ModalPpEditComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;
  
  data: Observable<IpPps[]> | undefined;

  constructor(private ipPpsService: IpPpsService) {
      this.ipPpsService.onClick.subscribe(cnt => this.data = cnt);
  }
 
  ngOnInit(): void {
    
  }

  openAdd(e:MouseEvent) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      data_add: new FormControl(null, Validators.required),
      kafedra: new FormControl(null, Validators.required)
    })
    this.flag = true;
    e.stopPropagation()  
  }

  openEdit(e:MouseEvent, data: IpPps) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      data_add: new FormControl(data.data_add, Validators.required),
      kafedra: new FormControl(data.kafedra.id, Validators.required)
    })
    e.stopPropagation()  
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    if (this.flag) {
      this.ipPpsService.addIpPps(this.form.value).subscribe(
        () => this.ipPpsService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
    else {
      this.ipPpsService.updateIpPps(this.form.value).subscribe(
        () => this.ipPpsService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }           
    this.form.enable()
    this.flag = false;
    this.visibility = "hidden"
    
  }


}
