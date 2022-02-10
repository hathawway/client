import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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
 
  //name!: string;
  postForm!: FormGroup;
  of !: BookOffice ;


  constructor(private officeService : OfficeService,
    private route: ActivatedRoute) { }
 
  ngOnInit() {

  }

  open(e:MouseEvent, office:BookOffice) {

 
    this.visibility = "visible"
    this.postForm = new FormGroup({
      id: new FormControl(office.id, Validators.required),
      name: new FormControl(office.name, Validators.required)
    })

    //console.log(params['id'])

    /*this.route.params.pipe(switchMap( (params: Params) => {
        if (params['id']) {
          return this.officeService.getOfficeById(params['id'])
        }

        return of(null)
      })).subscribe(office => {
        if (office) {
          this.form.patchValue( {
            name: office.name
          })
        }
      }, error => MaterialService.toast(error.error.message)
      )*/
      /*this.postForm.valueChanges.subscribe((v) => {
        console.log(v)
      
        
      })*/



    e.stopPropagation()
    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.officeService.updateOffice(this.postForm.value)
    console.log(this.postForm.value)
    this.visibility = "hidden"
  }

}
