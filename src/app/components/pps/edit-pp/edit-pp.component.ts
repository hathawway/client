import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Ip, Kafedra } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { IpService } from 'src/app/services/ip.service';
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
  data: Observable<Ip[]> | undefined;
  id:string | undefined;

  form!: FormGroup;
  ip!: Ip[];
  dataIp: Observable<Ip[]> | undefined;

  constructor(private kafedraService: KafedraService,
    private authService: AuthService,
    private ipService: IpService) { 
      this.ipService.onClick.subscribe(cnt=>this.dataIp = cnt);
      this.form = new FormGroup({
        dateStart: new FormControl(null, Validators.required),
        dateEnd: new FormControl(null, Validators.required),
        kafedra: new FormControl(null, Validators.required),
        user: new FormControl(this.ipService.getId(), Validators.required),
      })
    }

  ngOnInit(): void {
    this.authService.getUserByHeader().subscribe(d => this.ipService.setId(d.id))
    this.kafedra$ = this.kafedraService.getKafedra(this.ipService.getId())  
    this.getData();
  }

  getData() {
    this.ipService.setReqSearch("office")
    this.ipService.doClick()
  }

  delete(data: Ip) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.ipService.deleteIp(data, "").subscribe(
        () => this.getData(),
        error => {
          MaterialService.toast(error.error.message)
        }
      ) 
    }
  }

  openMenuEdit(e, ip: Ip) {
    this.menu.openEdit(e, ip)
  }

  openMenuAdd(e) {
    this.menu.openAdd(e)
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
