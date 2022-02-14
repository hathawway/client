import { Component, OnInit, HostBinding, HostListener, Input  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/classes/material.service';
import { User } from 'src/app/interfaces/interfaces';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-modal-add-user',
  templateUrl: './modal-add-user.component.html',
  styleUrls: ['./modal-add-user.component.css']
})
export class ModalAddUserComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"

  form!: FormGroup;
  flag = false;
 
  constructor(private authService : Auth,
    private router: Router,
    private route: ActivatedRoute) { }
 
  ngOnInit(): void {

  }

  openAdd(e:MouseEvent) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(null, Validators.required),
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      secondName: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      thirdName: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      office: new FormControl(null, Validators.required),
      post: new FormControl(null, Validators.required),
      work: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      stepen: new FormControl(null, Validators.required),
      zvanie: new FormControl(null, Validators.required),
      tel: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required)
    })
    this.flag = !this.flag
    e.stopPropagation()
  }

  openEdit(e:MouseEvent, user:User) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(user.id, Validators.required),
      login: new FormControl(user.login, Validators.required),
      password: new FormControl(user.password, Validators.required),
      secondName: new FormControl(user.second, Validators.required),
      firstName: new FormControl(user.first, Validators.required),
      thirdName: new FormControl(user.third, Validators.required),
      role: new FormControl(null, Validators.required),
      office: new FormControl(user.office, Validators.required),
      post: new FormControl(user.post, Validators.required),
      work: new FormControl(user.work, Validators.required),
      status: new FormControl(user.status, Validators.required),
      stepen: new FormControl(user.stepen, Validators.required),
      zvanie: new FormControl(user.zvanie, Validators.required),
      tel: new FormControl(user.tel, Validators.required),
      email: new FormControl(user.email, Validators.required)
    })
 
    e.stopPropagation()
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    if (this.flag) {
      this.authService.register(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/admin/user/']),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }
    else {
      this.authService.updateUser(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/admin/user/']),
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
