import { Component, OnInit, HostBinding, HostListener, Input  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/interfaces';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-modal-survey-user',
  templateUrl: './modal-survey-user.component.html',
  styleUrls: ['./modal-survey-user.component.css']
})
export class ModalSurveyUserComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"

  form!: FormGroup;
  user$ : Observable<User> | undefined;
 
  constructor(private authService: Auth,
    private router: Router) { }
 
  ngOnInit(): void {

  }

  openSurvey(e:MouseEvent, user: User) {
 
    this.visibility = "visible"
    this.user$ = this.authService.getUserById(user)
    e.stopPropagation()  
  }
 
  close() {
    this.visibility = "hidden"
  }


}
