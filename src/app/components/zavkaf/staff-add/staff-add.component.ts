import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Kafedra, User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth';
import { KafedraService } from 'src/app/services/kafedra.service';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.css']
})
export class StaffAddComponent implements OnInit {
 
  term!: string;
  data$: Observable<Kafedra[]> | undefined;
  users$: Observable<User[]> | undefined;
  isChecked: boolean = false;
  //office: Observable<User> | undefined;


  constructor(private kafedraService: KafedraService,
    private authService: AuthService) {}


  ngOnInit(): void {
    // вставить id кафедры к которой прикреплен завкаф
    // this.data$ = this.kafedraService.getKafedra(this.user.book_office.id)
    
    this.data$ = this.kafedraService.getKafedra()

    this.users$ = this.authService.getUser()
  }

  save(user: User) {
    if (this.isChecked) {
      // this.kafedraService.addKafedra(this.user, this.office).subscribe(
      //   () => this.router.navigate(['/dashboard/zavkaf/staff/']),
      //   error => {
      //     MaterialService.toast(error.error.message)
      //   }
      // )
    } else {
      // this.kafedraService.deleteKafedra().subscribe(
      //   () => this.router.navigate(['/dashboard/zavkaf/staff/']),
      //   error => {
      //     MaterialService.toast(error.error.message)
      //   }
      // )
    }

  }


}
