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
  users$: Observable<User[]> | undefined;
  isChecked: boolean = false;

  kafedra:string[] = [];
  check = false;
  userOffice!: User; 

  @ViewChild('tableBarTemplate') tableBarTemplate: PolymorpheusContent = '';
	 
	subscription = new Subscription();
 

  constructor(private kafedraService: KafedraService,
    private noti: NotiService,
    private authService: AuthService,
    @Inject(TuiTableBarsService)
	        private readonly tableBarsService: TuiTableBarsService,) {}

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
    this.users$ = this.authService.getUser()
    this.authService.getUserByHeader().subscribe( data => this.userOffice = data)
  }

  change() {
    this.check = !this.check;
  }


  addKafedra(user: User) {
    // if (ch) {
    //   this.kafedra.push(user.id);
    // } else {
    //   this.kafedra = this.kafedra.filter((value, index) => value !== user.id);
    // }
    //console.log(ch)
    this.kafedra.push(user.id);
  }

  save() {
    console.log(this.kafedra)
    console.log(this.userOffice.book_office.id)
    this.kafedraService.addKafedra(this.kafedra, this.userOffice.book_office).subscribe(
      () => this.isChecked = false,
        error => {
          this.noti.toast(error.error.message)
      }
    )
    this.kafedra= [];
  }

}
