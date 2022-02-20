import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NormaService } from 'src/app/services/norma.service';
import { KindActivity } from './../../../interfaces/interfaces';

@Component({
  selector: 'app-modal-add-kind-activity-table',
  templateUrl: './modal-add-kind-activity-table.component.html',
  styleUrls: ['./modal-add-kind-activity-table.component.css']
})
export class ModalAddKindActivityTableComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;


  constructor(private normaService : NormaService,
    private router: Router,
    private route: ActivatedRoute) { }
 
  ngOnInit(): void {

  }

  openEdit(e:MouseEvent, data:KindActivity) { 
    this.visibility = "visible"
    /*this.postForm = new FormGroup({
      id: new FormControl(office.id, Validators.required),
      name: new FormControl(office.name, Validators.required)
    })*/
    e.stopPropagation()    
  }

  openAdd(e:MouseEvent) { 
    /*this.visibility = "visible"
    this.postForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required)
    })*/

    this.flag = !this.flag
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    /*this.postForm.disable()
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
    window.location.reload()*/
    
  }

}
