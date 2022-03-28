import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { AuthService } from 'src/app/services/auth';
import { KindActivityService } from 'src/app/services/kindActivity.service';
import { KindActivity, User } from './../../../interfaces/interfaces';

@Component({
  selector: 'app-modal-add-kind-activity-table',
  templateUrl: './modal-add-kind-activity-table.component.html',
  styleUrls: ['./modal-add-kind-activity-table.component.css']
})
export class ModalAddKindActivityTableComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;
  users$: Observable<User[]> | undefined; 
  data: Observable<KindActivity[]> | undefined; 


  constructor(private kindActivityService : KindActivityService,
    private authService : AuthService) {
      this.kindActivityService.onClick.subscribe(cnt => this.data = cnt);
     }
 
  ngOnInit(): void {
    this.users$ = this.authService.getUser()
  }

  openEdit(e:MouseEvent, data:KindActivity) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      name: new FormControl(data.name, Validators.required),
      iduser: new FormControl(data.user.id, Validators.required)
    })
    e.stopPropagation()    
  }

  openAdd(e:MouseEvent) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      iduser: new FormControl(null, Validators.required)
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
      this.kindActivityService.addKindActivity(this.form.value).subscribe(
        () => this.kindActivityService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
    else {
      this.kindActivityService.updateKindActivity(this.form.value).subscribe(
        () => this.kindActivityService.doClick(),
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
