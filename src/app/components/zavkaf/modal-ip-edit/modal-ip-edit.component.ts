import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Ip } from 'src/app/interfaces/interfaces';
import { IpService } from 'src/app/services/ip.service';

@Component({
  selector: 'app-modal-ip-edit', 
  templateUrl: './modal-ip-edit.component.html',
  styleUrls: ['./modal-ip-edit.component.css']
})
export class ModalIpEditComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"

  form!: FormGroup;
  data: Observable<Ip[]> | undefined;
 
  constructor(private ipService : IpService) {
    this.ipService.onClick.subscribe(cnt => this.data = cnt);
}
 
  ngOnInit(): void {

  }

  open(e:MouseEvent, ip:Ip) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(ip.id, Validators.required),
      isagreement:new FormControl(ip.isagreement  === null ? null : ip.isagreement, Validators.required),
      data_agreement:new FormControl(ip.data_agreement === null ? null : ip.data_agreement, Validators.required),
      isimplementation: new FormControl(ip.isimplementation === null ? null : ip.isimplementation, Validators.required),
      data_implementation: new FormControl(ip.data_implementation === null ? null : ip.data_implementation, Validators.required)
    })
    e.stopPropagation()  
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    console.log(this.form.value)
      this.ipService.updateIpKafedra(this.form.value).subscribe(
        () => this.ipService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
          
    this.form.enable()
    this.visibility = "hidden"
  }


}
