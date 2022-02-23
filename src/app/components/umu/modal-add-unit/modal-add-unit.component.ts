import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/classes/material.service';
import { BookUnit } from 'src/app/interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';

@Component({
  selector: 'app-modal-add-unit',
  templateUrl: './modal-add-unit.component.html',
  styleUrls: ['./modal-add-unit.component.css']
})
export class ModalAddUnitComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;


  constructor(private normaService : NormaService,
    private router: Router,
    private route: ActivatedRoute) { }
 
  ngOnInit() {

  }

  openEdit(e:MouseEvent, data:BookUnit) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      name: new FormControl(data.name, Validators.required)
    })
    e.stopPropagation()    
  }

  openAdd(e:MouseEvent) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.flag = !this.flag
    e.stopPropagation()    
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    if (this.flag) {
      this.normaService.addBookUnit(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/unit/']),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }
    else {
      this.normaService.updateBookUnit(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/unit/']),
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
