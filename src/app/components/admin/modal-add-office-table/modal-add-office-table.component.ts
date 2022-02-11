import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { BookOffice } from 'src/app/interfaces/interfaces';
import { OfficeService } from 'src/app/services/office.service';

@Component({
  selector: 'app-modal-add-office-table',
  templateUrl: './modal-add-office-table.component.html',
  styleUrls: ['./modal-add-office-table.component.css']
})
export class ModalAddOfficeTableComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  postForm!: FormGroup;
  of !: BookOffice ;
  flag = false;


  constructor(private officeService : OfficeService,
    private router: Router,
    private route: ActivatedRoute) { }
 
  ngOnInit() {

  }

  openEdit(e:MouseEvent, office:BookOffice) { 
    this.visibility = "visible"
    this.postForm = new FormGroup({
      id: new FormControl(office.id, Validators.required),
      name: new FormControl(office.name, Validators.required)
    })
    e.stopPropagation()    
  }

  openAdd(e:MouseEvent) { 
    this.visibility = "visible"
    this.postForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required)
    })
    this.flag = !this.flag
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.postForm.disable()
    if (this.flag) {
      this.officeService.addOffice(this.postForm.value).subscribe(
        () => this.router.navigate(['/dashboard/admin/office/']),
        error => {
          MaterialService.toast(error.error.message)
          this.postForm.enable()
        }
      )
    }
    else {
      this.officeService.updateOffice(this.postForm.value).subscribe(
        () => this.router.navigate(['/dashboard/admin/office/']),
        error => {
          MaterialService.toast(error.error.message)
          this.postForm.enable()
        }
      )
    }            
    this.visibility = "hidden"
    window.location.reload()
    
  }

}
