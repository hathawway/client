import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';
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

  constructor(private officeService : OfficeService) { }
 
  ngOnInit() {
  }

  open(e:MouseEvent) {

 
    this.visibility = "visible"
 
    e.stopPropagation()
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

}
