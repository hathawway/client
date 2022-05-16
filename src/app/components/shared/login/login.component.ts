import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { NotiService } from '../../../utils/noti.service'
// @ts-ignore
import * as forge from 'node-forge';
import { tuiInputPasswordOptionsProvider, TUI_PASSWORD_TEXTS, TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService} from '@taiga-ui/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
	    providers: [
	        tuiInputPasswordOptionsProvider({
	            icons: {
	                hide: 'tuiIconLockLarge',
	                show: 'tuiIconLockOpenLarge',
	            },
	        }),
	        {
	            provide: TUI_PASSWORD_TEXTS,
	            useValue: of(['']),
	        },
          {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'Поле обязательно для заполнения!',
                email:'Невалидный email!',
            },
        },
	    ],
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  aSub!: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,) {}

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })


    this.route.queryParams.subscribe( () => (params: Params) => {
      if (params['accessDenied']) {
        this.alertService.open('Необходимо авторизоваться в системе',
          {label: 'With a heading!'}).subscribe();
      }
    })

  }

  onSubmit(): void {
    this.form.disable()

    this.aSub =
      this.auth.rsaKey().subscribe(
        (key) => {
          const rsaKey = forge.pki.publicKeyFromPem(key);
          // @ts-ignore
          this.form.value.password = window.btoa(rsaKey.encrypt(this.form.value.password));
          this.auth.login(this.form.value).subscribe(
            () => this.router.navigate([`/dashboard/`]),
            (error) => {
              this.alertService.open(error.error.message,
                {label: 'Ошибка!'}).subscribe();
            }
          )
        },
        error => {
          this.alertService.open(error.error.message,
            {label: 'Ошибка!'}).subscribe();
        }
      )
      this.form.enable()
  }


}
