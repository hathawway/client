import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/classes/material.service';
import { StavkaYear } from 'src/app/interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';

@Component({
  selector: 'app-modal-edit-stavka',
  templateUrl: './modal-edit-stavka.component.html',
  styleUrls: ['./modal-edit-stavka.component.css']
})
export class ModalEditStavkaComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;

  constructor(private normaService : NormaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  open(e:MouseEvent, norma: StavkaYear) { 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(norma.id, Validators.required),
      norma: new FormControl(norma.norma, Validators.required)
    })
    e.stopPropagation()    
  }

 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    this.normaService.updateStavkaYear(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/stavka/']),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
    )          
    this.visibility = "hidden"
    window.location.reload()
  }
    
}