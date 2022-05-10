import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tuiInputPasswordOptionsProvider, TUI_PASSWORD_TEXTS, TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable,Subject, of } from 'rxjs';
import {map, mapTo, shareReplay, startWith, switchMap} from 'rxjs/operators';
import { BookOffice, BookPost, BookRole, BookStatus, BookStepen, BookWork, BookZvanie, User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { OfficeService } from 'src/app/services/office.service';
import { PostService } from 'src/app/services/post.service';
import { RoleService } from 'src/app/services/role.service';
import { StatusService } from 'src/app/services/status.service';
import { StepenService } from 'src/app/services/stepen.service';
import { WorkService } from 'src/app/services/work.service';
import { ZvanieService } from 'src/app/services/zvanie.service';
import { NotiService } from 'src/app/utils/noti.service';
import { StrService } from 'src/app/utils/stringify.service';
import {TUI_DEFAULT_MATCHER, tuiPure} from '@taiga-ui/cdk';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.less'],
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
                pattern: 'Невалидный снилс символов',
                minLength: 'Невалидный кол-во символов',
            },
        },
	    ],
})
export class UserTableComponent implements OnInit {

  data$: Observable<User[]> | undefined;
  term!: string;

  flag = false;
  form!: FormGroup;
  open = false;

  formTypeMessage: string | undefined;

  messageError = "";

  valueOffice!: Number | null;
  valuePost!: Number | null;
  valueWork!: Number | null;
  valueRole!: Number | null;
  valueStatus!: Number | null;
  valueStepen!: Number | null;
  valueZvanie!: Number | null;

  valueRoles!: BookRole[];

  showPassword!: boolean;

  offices$!: Observable<BookOffice[]>;
  posts$!: Observable<BookPost[]>;
  works$!: Observable<BookWork[]>;

  rolesList: Map<string, BookRole>;

  statuses$!: Observable<BookStatus[]>;
  stepens$!: Observable<BookStepen[]>;
  zvanies$!: Observable<BookZvanie[]>;

  maskSnils = {
    guide: false,
    mask: [
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
    ],
};

  constructor(private authService: AuthService,
    private officeService: OfficeService,
    private postService: PostService,
    private roleService: RoleService,
    public str: StrService,
    private workService: WorkService,
    private statusService: StatusService,
    private stepenService: StepenService,
    private zvanieService: ZvanieService,
    private noti: NotiService) {
      this.data$ = this.authService.getUsersShort();

      this.rolesList = new Map<string, BookRole>();
      this.roleService.getRoles().subscribe(
        value => {
            value.forEach(value1 => this.rolesList.set(value1.name, value1))
        }
      );
  }

  ngOnInit(): void {
    this.getData();

    this.offices$ = this.officeService.getOffice()
    this.posts$ = this.postService.getPost()
    this.works$ = this.workService.getWork()
    this.statuses$ = this.statusService.getStatus()
    this.stepens$ = this.stepenService.getStepen()
    this.zvanies$ = this.zvanieService.getZvanie()
  }

  getData() {
    this.authService.doClick()
  }

  add() {
    this.formTypeMessage = 'Добавить пользователя';
    this.open = true;
	  this.form = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      second: new FormControl(null, Validators.required),
      first: new FormControl(null, Validators.required),
      third: new FormControl(null),
      //book_role: new FormControl(null, Validators.required),
      idbook_office: new FormControl(null, Validators.required),
      idbook_post: new FormControl(null, Validators.required),
      idbook_work: new FormControl(null, Validators.required),
      idbook_status: new FormControl(null, Validators.required),
      idbook_stepen: new FormControl(null),
      idbook_zvanie: new FormControl(null),
      snils: new FormControl(null, [Validators.required, Validators.pattern(/^\d{11}$/)]),
      tel: new FormControl(null, Validators.minLength(12)),
    })
    this.flag = true;
    this.valueOffice = null;
    this.valuePost = null;
    this.valueStatus = null;
    this.valueStepen = null;
    this.valueZvanie = null;
    this.valueRole = null;
    this.valueWork = null;
	}

  edit(userId: string) {
    this.authService.getUserById(userId).subscribe(
      user => {
        this.formTypeMessage = 'Редактирование пользователя';

        this.open = true;
        const roles = user.roles.map(value => {return value.name})
        let formContent =  {
          id: new FormControl(user.id, Validators.required),
          login: new FormControl(user.login, [Validators.required, Validators.email]),
          second: new FormControl(user.second, Validators.required),
          first: new FormControl(user.first, Validators.required),
          third: new FormControl(user.third),
          //book_role: new FormControl(user.book_role.id, Validators.required),
          idbook_office: new FormControl(user.book_office === null ? null : user.book_office.id, Validators.required),
          idbook_post: new FormControl(user.book_post === null ? null : user.book_post.id, Validators.required),
          idbook_work: new FormControl(user.book_work === null ? null : user.book_work.id, Validators.required),
          idbook_status: new FormControl(user.book_status === null ? null : user.book_status.id, Validators.required),
          idbook_stepen: new FormControl(user.book_stepen === null ? null : user.book_stepen.id),
          idbook_zvanie: new FormControl(user.book_zvanie === null ? null : user.book_zvanie.id),
          snils: new FormControl(user.snils, [Validators.required, Validators.pattern(/^\d{11}$/)]),
          tel: new FormControl(user.tel, Validators.minLength(12)),
          password: new FormControl(''),
          role: new FormControl(roles),
        }

        this.showPassword = user.login != 'admin@gmail.com'

        this.form = new FormGroup(formContent)
        this.valueOffice = user.book_office === null ? null : Number(user.book_office.id);
        this.valuePost = user.book_post === null ? null : Number(user.book_post.id);
        this.valueStatus = user.book_status === null ? null : Number(user.book_status.id);
        this.valueStepen = user.book_stepen === null ? null : Number(user.book_stepen.id);
        this.valueZvanie = user.book_zvanie === null ? null : Number(user.book_zvanie.id);
        this.valueWork = user.book_work === null ? null : Number(user.book_work.id);
      }
    )
	}

  onSubmit() {
    this.form.disable()

    let role = this.form.value['role'];
    if (role) {
      let ids = new Array<string>();
      for (let r of role) {
        let dicRole = this.rolesList.get(r);
        if (dicRole) {
          ids.push(dicRole.id)
        }

      }
      this.form.value['role'] = ids
    }

    if (this.flag) {
      this.authService.register(this.form.value).subscribe(
        () => {
          this.authService.doClick(),
          this.form.reset();
        },
        error => {
          this.messageError = error.error.message
        }
      )
    }
    else {
      this.authService.updateUser(this.form.value).subscribe(
        () => {
          this.authService.doClick();
          this.close();
        },
        error => {
          this.messageError = error.error.message
        }
      )
    }
    this.form.enable()

    if (this.form.value['id'] == this.authService.getLoggedUserId()) {
      window.location.reload()
    }
  }

  close() {
    this.open = false;
    this.flag = false;
    this.form.reset();
    this.messageError = "";
  }

  delete(user:User) {
    const decision = window.confirm("Удалить?")
    if (decision) {
      this.authService.deleteUser(user).subscribe(
        () => this.getData(),
        error => {
          this.noti.toast(error.error.message)
        }
      )
    }
  }

  search: string | null = '';

  @tuiPure
  filter(search: string | null): readonly string[] {
    console.log('search', this.search)
    return [...this.rolesList.keys()].filter(item => TUI_DEFAULT_MATCHER(item, search || ''));
  }
}
