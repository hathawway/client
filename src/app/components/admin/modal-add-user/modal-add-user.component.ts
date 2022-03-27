import { Component, OnInit, HostBinding, HostListener, Input  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/classes/material.service';
import { User, BookOffice, BookPost, BookWork, BookRole, BookStepen, BookZvanie, BookStatus } from 'src/app/interfaces/interfaces';
import { Auth } from 'src/app/services/auth';
import { Observable } from 'rxjs';
import { OfficeService } from 'src/app/services/office.service';
import { PostService } from 'src/app/services/post.service';
import { RoleService } from 'src/app/services/role.service';
import { StatusService } from './../../../services/status.service';
import { WorkService } from 'src/app/services/work.service';
import { StepenService } from 'src/app/services/stepen.service';
import { ZvanieService } from 'src/app/services/zvanie.service';

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
  offices$: Observable<BookOffice[]> | undefined;
  posts$: Observable<BookPost[]> | undefined;
  works$: Observable<BookWork[]> | undefined;
  roles$: Observable<BookRole[]> | undefined;
  statuses$: Observable<BookStatus[]> | undefined;
  stepens$: Observable<BookStepen[]> | undefined;
  zvanies$: Observable<BookZvanie[]> | undefined;
 
  constructor(private authService : Auth,
    private officeService: OfficeService,
    private postService: PostService,
    private roleService: RoleService,
    private workService: WorkService,
    private statusService: StatusService,
    private stepenService: StepenService,
    private zvanieService: ZvanieService,
    private router: Router,
    private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.offices$ = this.officeService.getOffice()
    this.posts$ = this.postService.getPost()
    this.works$ = this.workService.getWork()
    //this.roles$ = this.roleService.getRole()
    this.statuses$ = this.statusService.getStatus()
    this.stepens$ = this.stepenService.getStepen()
    this.zvanies$ = this.zvanieService.getZvanie()
  }

  openAdd(e:MouseEvent) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      second: new FormControl(null, Validators.required),
      first: new FormControl(null, Validators.required),
      third: new FormControl(null, Validators.required),
      //book_role: new FormControl(null, Validators.required),
      book_office: new FormControl(null, Validators.required),
      book_post: new FormControl(null, Validators.required),
      book_work: new FormControl(null, Validators.required),
      book_status: new FormControl(null, Validators.required),
      book_stepen: new FormControl(null, Validators.required),
      book_zvanie: new FormControl(null, Validators.required),
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
      second: new FormControl(user.second, Validators.required),
      first: new FormControl(user.first, Validators.required),
      third: new FormControl(user.third, Validators.required),
      //book_role: new FormControl(user.book_role.id, Validators.required),
      book_office: new FormControl(user.book_office.id, Validators.required),
      book_post: new FormControl(user.book_post.id, Validators.required),
      book_work: new FormControl(user.book_work.id, Validators.required),
      book_status: new FormControl(user.book_status.id, Validators.required),
      book_stepen: new FormControl(user.book_stepen.id, Validators.required),
      book_zvanie: new FormControl(user.book_zvanie.id, Validators.required),
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
