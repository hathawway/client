import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/classes/material.service';
import { StavkaYear } from 'src/app/interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';

@Component({
  selector: 'app-modal-add-stavka-shared',
  templateUrl: './modal-add-stavka-shared.component.html',
  styleUrls: ['./modal-add-stavka-shared.component.css']
})
export class ModalAddStavkaSharedComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;

  constructor(private normaService : NormaService,
    private router: Router,
    private route: ActivatedRoute) { }
 
  ngOnInit(): void {

  }

  openEdit(e:MouseEvent, data:StavkaYear) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      norma: new FormControl(data.norma, Validators.required),
      year: new FormControl(data.year, Validators.required)
    })
    e.stopPropagation()    
  }

  openAdd(e:MouseEvent) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      norma: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required)
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
      this.normaService.addStavkaYear(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/stavka-shared/']),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }
    else {
      this.normaService.updateStavkaYear(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/stavka-shared/']),
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
