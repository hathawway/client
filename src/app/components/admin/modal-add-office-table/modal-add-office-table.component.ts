import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
 
  name!: String;
  form!: FormGroup;

  constructor(private officeService : OfficeService,
    private route: ActivatedRoute) { }
 
  ngOnInit() {

  }

  open(e:MouseEvent, office:BookOffice) {

 
    this.visibility = "visible"
    console.log('jedj')
    /*this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

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
    e.stopPropagation()
    console.log('j111111edj')
    
  }
 
  close() {
    this.visibility = "hidden"
  }
 
  save() {
    const office = {
      name: this.name
    }
    if (this.officeService.checkName(office.name)) {     
      //this.officeService.addOffice(office)
      this.visibility = "hidden"
    }
    
  }

  onSubmit() {

  }

}
