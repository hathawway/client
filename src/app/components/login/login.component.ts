import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Auth } from '../../services/auth';
import {MaterialService} from './../../classes/material.service';
// @ts-ignore
import * as forge from 'node-forge';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/interfaces/interfaces';
//import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  aSub!: Subscription;



  constructor(
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute) { 
    }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })


    this.route.queryParams.subscribe( () => (params: Params) => {
      if (params['accessDenied']) {
        MaterialService.toast('Необходимо авторизоваться в системе')
      }
    })

  }

  onSubmit(): void {
    
    this.form.disable()
    console.log(this.form.value);
    this.aSub =
      this.auth.rsaKey().subscribe(
        (key) => {
          console.log(key)
          const rsaKey = forge.pki.publicKeyFromPem(key);
          // @ts-ignore
          console.log(this.form.value.password);
          // @ts-ignore
          this.form.value.password = window.btoa(rsaKey.encrypt(this.form.value.password));
          this.auth.login(this.form.value).subscribe(
            () => this.router.navigate([`/dashboard/`]),
            error => {
              MaterialService.toast(error.error.message)
              this.form.enable()
            }
          )
        },
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
  }

}
