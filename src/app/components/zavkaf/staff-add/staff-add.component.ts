import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookOffice, Kafedra, User } from 'src/app/interfaces/interfaces';
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
  kafedra:string[] = [];
  check = false;
  userOffice!: User; 
 

  constructor(private kafedraService: KafedraService,
    private authService: AuthService) {}


  ngOnInit(): void {
    this.data$ = this.kafedraService.getKafedra()

    this.users$ = this.authService.getUser()
    

    this.authService.getUserByHeader().subscribe( data => this.userOffice = data)

  }

  checkEdit() {
    this.isChecked = true;
  }

  change() {
    this.check = !this.check;
  }

  checkClose() {
    this.isChecked = false;
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
            MaterialService.toast(error.error.message)
      }
    )
    this.kafedra= [];
  }

}
