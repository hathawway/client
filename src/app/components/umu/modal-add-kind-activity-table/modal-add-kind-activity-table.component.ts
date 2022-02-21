import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Auth } from 'src/app/services/auth';
import { NormaService } from 'src/app/services/norma.service';
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


  constructor(private normaService : NormaService,
    private router: Router,
    private route: ActivatedRoute,
    private authService : Auth) { }
 
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

    this.flag = !this.flag
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    if (this.flag) {
      this.normaService.addKindActivity(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/kind-activity/']),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }
    else {
      this.normaService.updateKindActivity(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/kind-activity/']),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }      
    this.visibility = "hidden"
    window.location.reload()
    
  }

}
