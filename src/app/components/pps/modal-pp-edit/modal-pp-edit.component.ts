import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Ip, Kafedra, User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth';
import { KafedraService } from 'src/app/services/kafedra.service';
import { OfficeService } from 'src/app/services/office.service';
import { IpPpsService } from 'src/app/services/pps.service';


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
  kafedra$: Observable<Kafedra[]> | undefined;
  
  data: Observable<Ip[]> | undefined;
  user!: User; 

  constructor(private ipPpsService: IpPpsService,
    private authService: AuthService,
    private kafedraService: KafedraService) {
      this.ipPpsService.onClick.subscribe(cnt => this.data = cnt);
  }
 
  ngOnInit(): void {
    this.kafedra$ = this.kafedraService.getKafedraByUser()
    this.authService.getUserByHeader().subscribe( data => this.user = data)
  }

  openAdd(e:MouseEvent) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      data_add: new FormControl(null, Validators.required),
      user: new FormControl(this.user.id),
      kafedra: new FormControl(null, Validators.required)
    })
    this.flag = true;
    e.stopPropagation()  
  }

  openEdit(e:MouseEvent, data: Ip) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      data_add: new FormControl(data.data_add, Validators.required),
      user: new FormControl(data.user.id),
      kafedra: new FormControl(data.kafedra.book_office.id, Validators.required)
    })
    e.stopPropagation()  
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    console.log(this.form.value)
    if (this.flag) {
      this.ipPpsService.addIp(this.form.value).subscribe(
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
