import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  flag = false;
  data: Observable<BookOffice[]> | undefined;

  constructor(private officeService : OfficeService) {
      this.officeService.onClick.subscribe(cnt => this.data = cnt);
  }
 
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
      name: new FormControl(null, Validators.required)
    })

    this.flag = true;
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.postForm.disable()
    if (this.flag) {
      this.officeService.addOffice(this.postForm.value).subscribe(
        () => this.officeService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }
    else {
      this.officeService.updateOffice(this.postForm.value).subscribe(
        () => this.officeService.doClick(),
        error => {
          MaterialService.toast(error.error.message)
        }
      )
    }            
    this.postForm.enable()
    this.flag = false;
    this.visibility = "hidden"
  }

}
