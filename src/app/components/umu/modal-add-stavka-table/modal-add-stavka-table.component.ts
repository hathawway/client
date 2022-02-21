import { Component, OnInit, HostBinding, HostListener, Input   } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookPost, NormaStudy } from 'src/app/interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-modal-add-stavka-table',
  templateUrl: './modal-add-stavka-table.component.html',
  styleUrls: ['./modal-add-stavka-table.component.css']
})
export class ModalAddStavkaTableComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;
  posts$: Observable<BookPost[]> | undefined;

  constructor(private normaService : NormaService,
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.posts$ = this.postService.getPost()
  }

  openEdit(e:MouseEvent, data:NormaStudy) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      norma: new FormControl(data.norma, Validators.required),
      idbook_post: new FormControl(data.book_post.id, Validators.required)
    })
    e.stopPropagation()    
  }

  openAdd(e:MouseEvent) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      norma: new FormControl(null, Validators.required),
      idbook_post: new FormControl(null, Validators.required)
    })

    this.flag = !this.flag
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    console.log(this.form.value)
    if (this.flag) {
      this.normaService.addNormaStudy(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/stavka/']),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }
    else {
      this.normaService.updateNormaStudy(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/stavka/']),
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
