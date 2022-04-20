import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Ip, IpPps, Kafedra } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { IpService } from 'src/app/services/ip.service';
import { IpPpsService } from 'src/app/services/ipPps.service';
import { KafedraService } from 'src/app/services/kafedra.service';
import { ModalPpEditComponent } from '../modal-pp-edit/modal-pp-edit.component';


@Component({
  selector: 'app-edit-pp',
  templateUrl: './edit-pp.component.html',
  styleUrls: ['./edit-pp.component.css']
})
export class EditPpComponent implements OnInit {

  @ViewChild(ModalPpEditComponent) menu!:ModalPpEditComponent

  kafedra$: Observable<Kafedra[]> | undefined;
  data: Observable<IpPps[]> | undefined;
  id:string | undefined;

  form!: FormGroup;
  ip!: Ip[];
  //data: Observable<IpPps[]> | undefined;

  checkAdd = false;

  constructor(private kafedraService: KafedraService,
    private authService: AuthService,
    private ipPpsService: IpPpsService,
    private ipService: IpService) { 
      this.ipPpsService.onClick.subscribe(cnt=>this.data = cnt);
    }

  ngOnInit(): void {
    //this.authService.getUserByHeader().subscribe(d => this.ipService.setId(d.id))
    this.kafedraService.setReqSearch("user")
    this.kafedra$ = this.kafedraService.getKafedra(this.kafedraService.getReqSearch())  
    this.getData();
    if (this.ipPpsService.getId() === "") {
      this.checkAdd = true
      this.form = new FormGroup({
        data_start: new FormControl(null, Validators.required),
        data_end: new FormControl(null, Validators.required),
        kafedra: new FormControl(null, Validators.required),
      })
    } else {
      this.ipService.getIpById(this.ipPpsService.getId()).subscribe( (value) => {
        this.form = new FormGroup({
          id: new FormControl(value.id, Validators.required),
          data_start: new FormControl(value.data_start === null ? null : value.data_start, Validators.required),
          data_end: new FormControl(value.data_end === null ? null : value.data_end, Validators.required),
          kafedra: new FormControl(value.kafedra === null ? null : value.kafedra.id, Validators.required),
        })
      })
      
      
    }
  }

  getData() {
    //this.ipService.setReqSearch("office")
    this.ipPpsService.doClick()
  }

  delete(data: IpPps) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.ipPpsService.deleteIpPps(data).subscribe(
        () => this.getData(),
        error => {
          MaterialService.toast(error.error.message)
        }
      ) 
    }
  }

  openMenuEdit(e, ip: IpPps) {
    this.menu.openEdit(e, ip)
  }

  addOrSave() {
    if (this.checkAdd) {
      this.checkAdd = false;
      console.log(this.form.value)
      this.ipService.addIp(this.form.value).subscribe(
        () => this.getData(),
        error => {
          MaterialService.toast(error.error.message)
        }
      ) 
    } else {
      this.ipService.updateIp(this.form.value).subscribe(
        () => this.getData(),
        error => {
          MaterialService.toast(error.error.message)
        }
      ) 
    }    
  }

  openMenuAdd(e) {
    this.menu.openAdd(e)
    this.addOrSave()   
  }

  onSubmit() {
    console.log(this.form.value)
    // this.ipService.addIp(this.form.value).subscribe(
    //   (d) => {
    //     this.id = d.toString(), 
    //     console.log(this.id),
    //     this.data?.subscribe( (d) => 
    //       d.forEach(value => {
    //         this.ip.push(value),
    //         console.log(value)
    //       })
    //     ),
    //     this.ipService.updateIp(this.id, this.ip),
    //     this.getData()
    //     this.ipService.doClick()
    //   },
    //   error => {
    //     MaterialService.toast(error.error.message)
    //   }
    // )    
  }

}
