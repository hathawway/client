import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from 'src/app/classes/material.service';
import { Activity, KindActivity } from 'src/app/interfaces/interfaces';
import { NormaService } from 'src/app/services/norma.service';

@Component({
  selector: 'app-modal-add-activity-table',
  templateUrl: './modal-add-activity-table.component.html',
  styleUrls: ['./modal-add-activity-table.component.css']
})
export class ModalAddActivityTableComponent implements OnInit {

  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  form!: FormGroup;
  flag = false;
  kinds$: Observable<KindActivity[]> | undefined;

  constructor(private normaService: NormaService,
    private router: Router,
    private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.kinds$ = this.normaService.getKindActivity()
  }

  openAdd(e:MouseEvent) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      idkind_activity: new FormControl(null, Validators.required)
    })
    this.flag = !this.flag
    e.stopPropagation()  
  }

  openEdit(e:MouseEvent, data: Activity) {
 
    this.visibility = "visible"
    this.form = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      name: new FormControl(data.name, Validators.required),
      idkind_activity: new FormControl(data.kind_activity.id, Validators.required)
    })
    e.stopPropagation()  
  }
 
  close() {
    this.visibility = "hidden"
  }

  onSubmit() {
    this.form.disable()
    if (this.flag) {
      this.normaService.addActivity(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/activity/']),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }
    else {
      this.normaService.updateActivity(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard/umu/activity/']),
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
