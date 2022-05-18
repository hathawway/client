import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { NotiService } from '../../../utils/noti.service'
// @ts-ignore
import * as forge from 'node-forge';
import { tuiInputPasswordOptionsProvider, TUI_PASSWORD_TEXTS, TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService} from '@taiga-ui/core';
import { BookOffice, BookPost, BookRole, BookStatus, BookStepen, BookWork, BookZvanie } from 'src/app/interfaces/interfaces';
import { OfficeService } from 'src/app/services/office.service';
import { PostService } from 'src/app/services/post.service';
import { RoleService } from 'src/app/services/role.service';
import { StrService } from 'src/app/utils/stringify.service';
import { WorkService } from 'src/app/services/work.service';
import { StatusService } from 'src/app/services/status.service';
import { StepenService } from 'src/app/services/stepen.service';
import { ZvanieService } from 'src/app/services/zvanie.service';
import { tuiPure, TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';

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
                pattern: 'Невалидный снилс символов (пр. 111-111-111 11)',
                minlength: 'Невалидный кол-во символов',
                mismatch: 'Пароли не совпадают!'
            },
        },
	    ],
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  aSub!: Subscription;

  messageError = "";
  formRegistration!: FormGroup;
  open = false;

  valueOffice!: Number | null;
  valuePost!: Number | null;
  valueWork!: Number | null;
  valueRole!: Number | null;
  valueStatus!: Number | null;
  valueStepen!: Number | null;
  valueZvanie!: Number | null;
  valueRoles!: BookRole[];

  roleFormControl!: FormControl | null;

  offices$!: Observable<BookOffice[]>;
  posts$!: Observable<BookPost[]>;
  works$!: Observable<BookWork[]>;

  rolesList!: Map<string, BookRole>;

  statuses$!: Observable<BookStatus[]>;
  stepens$!: Observable<BookStepen[]>;
  zvanies$!: Observable<BookZvanie[]>;

  search: string | null = '';

  readonly passwordTwo = new FormControl(null);

  constructor(
    private authService: AuthService,
    private officeService: OfficeService,
    private postService: PostService,
    private roleService: RoleService,
    public str: StrService,
    private workService: WorkService,
    private statusService: StatusService,
    private stepenService: StepenService,
    private zvanieService: ZvanieService,
    private noti: NotiService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,) {

    }

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

  registration() {
    this.offices$ = this.officeService.getOffice()
    this.posts$ = this.postService.getPost()
    this.works$ = this.workService.getWork()
    this.statuses$ = this.statusService.getStatus()
    this.stepens$ = this.stepenService.getStepen()
    this.zvanies$ = this.zvanieService.getZvanie()

    this.rolesList = new Map<string, BookRole>();
    this.roleService.getRoles().subscribe(
      value => {
        value.forEach(role => this.rolesList.set(role.name, role));
      }
    );

    this.open = true;

	  this.formRegistration = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      passwordTwo: this.passwordTwo,
      second: new FormControl(null, Validators.required),
      first: new FormControl(null, Validators.required),
      third: new FormControl(null),
      idbook_office: new FormControl(null, Validators.required),
      idbook_post: new FormControl(null, Validators.required),
      idbook_work: new FormControl(null, Validators.required),
      idbook_status: new FormControl(null, Validators.required),
      idbook_stepen: new FormControl(null),
      idbook_zvanie: new FormControl(null),
      snils: new FormControl(null, [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{3} \d{2}$/)]),
      tel: new FormControl(null, Validators.minLength(12)),
      role: new FormControl([], Validators.required),
    })
    this.valueOffice = null;
    this.valuePost = null;
    this.valueStatus = null;
    this.valueStepen = null;
    this.valueZvanie = null;
    this.valueRole = null;
    this.valueWork = null;
    this.formRegistration.get('passwordTwo')?.addValidators(Validators.required);
  }

  onPasswordChange() {
    if (this.formRegistration.controls['passwordTwo'].value == this.formRegistration.controls['password'].value) {
      this.passwordTwo.setErrors(null);
    } else {
      this.passwordTwo.setErrors({ mismatch: true });
    }
  }


  onSubmitRegistration() {
    this.formRegistration.disable()

    let role = this.formRegistration.value['role'];
    if (role) {
      let ids = new Array<string>();
      for (let r of role) {
        let dicRole = this.rolesList.get(r);
        if (dicRole) {
          ids.push(dicRole.id)
        }

      }
      this.formRegistration.value['role'] = ids
    }

      this.authService.register(this.formRegistration.value).subscribe(
        () => {
          this.close();
        },
        error => {
          this.messageError = error.error.message
        }
      )


    this.formRegistration.enable();

    if (this.formRegistration.value['id'] == this.authService.getLoggedUserId()) {
      window.location.reload()
    }
  }

  @tuiPure
  filter(search: string | null): readonly string[] {
    return [...this.rolesList.keys()].filter(item =>
       TUI_DEFAULT_MATCHER(item, search || '')
    );
  }

  close() {
    this.open = false;
    this.form.reset();
    this.messageError = "";
  }

  onSubmit(): void {
    this.form.disable()

    this.aSub =
      this.authService.rsaKey().subscribe(
        (key) => {
          const rsaKey = forge.pki.publicKeyFromPem(key);
          // @ts-ignore
          this.form.value.password = window.btoa(rsaKey.encrypt(this.form.value.password));
          this.authService.login(this.form.value).subscribe(
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
