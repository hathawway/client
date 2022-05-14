import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild} from '@angular/core';
import { TuiTableBarsService } from '@taiga-ui/addon-tablebars';
import { Observable, Subscription } from 'rxjs';
import { Kafedra, User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { KafedraService } from 'src/app/services/kafedra.service';
import { NotiService } from 'src/app/utils/noti.service';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffAddComponent implements OnInit {

  term!: string;
  data$: Observable<Kafedra[]> | undefined;
  users$!: Observable<User[]>;
  isChecked: boolean = false;

  book_office_id: string | undefined;

  kafedra!: Map<string, boolean>;
  check = false;
  userOffice!: User;

  @ViewChild('tableBarTemplate') tableBarTemplate: PolymorpheusContent = '';

	subscription = new Subscription();


  constructor(private kafedraService: KafedraService,
    private noti: NotiService,
    private authService: AuthService,
    @Inject(TuiTableBarsService)
	        private readonly tableBarsService: TuiTableBarsService,) {

  }

  showTableBar() {
    this.subscription.unsubscribe();
    this.isChecked = true;
    this.subscription = this.tableBarsService
        .open(this.tableBarTemplate || '', {
            adaptive: true,
        })
        .subscribe();
  }

  closeTableBar() {
    this.isChecked = false;
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.authService.getUserByHeader().subscribe( data => this.userOffice = data)
    this.updateUsersInfo()
  }

  change() {
    this.check = !this.check;
  }


  toggleUserToKafedra(user: User) {
    if (this.kafedra.get(user.id)) {
      this.kafedra.delete(user.id)
    } else {
      this.kafedra.set(user.id, true);
    }
  }

  updateUsersInfo() {
    this.kafedra = new Map<string, boolean>();
    this.users$ = this.authService.getUsersWithCafedraList();
    this.authService.getUserByHeader().subscribe(value => {
      this.book_office_id = value.book_office.id;
      this.users$.subscribe(users => {
        for (let u of users) {
          if (u.book_office.id === this.book_office_id) {
            this.kafedra.set(u.id, true);
            continue
          }

          if (u.other_kafedrs) {
            for (let uk of u.other_kafedrs) {
              if (uk === this.book_office_id) {
                this.kafedra.set(u.id, true);
                break
              }
            }
          }
        }
      })
    })
  }

  save() {
    this.kafedraService.addKafedra([...this.kafedra.keys()], this.userOffice.book_office).subscribe(
      () => {
        this.isChecked = false;
        this.updateUsersInfo();
      },
        error => {
          this.noti.toast(error.error.message)
      }
    )
    this.closeTableBar()
  }

}
