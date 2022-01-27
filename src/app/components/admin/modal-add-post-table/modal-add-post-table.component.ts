import { Component, OnInit, HostBinding, HostListener, Input  } from '@angular/core';

@Component({
  selector: 'app-modal-add-post-table',
  templateUrl: './modal-add-post-table.component.html',
  styleUrls: ['./modal-add-post-table.component.css']
})
export class ModalAddPostTableComponent implements OnInit {
  
  @HostBinding("style.visibility") visibility = "hidden"
  @Input() @HostBinding("style.width") width = "600px"
 
  name: String | undefined;
  
  constructor() { }
 
  ngOnInit(): void {

  }

  open(e:MouseEvent) {
 
    this.visibility = "visible"
 
    e.stopPropagation()
  }
 
  close() {
    this.visibility = "hidden"
  }

  save() {
    this.visibility = "hidden"
  }

}
