import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalRoleComponent } from '../modal-role/modal-role.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @ViewChild(ModalRoleComponent) menu:ModalRoleComponent

  ngOnInit(): void {
    
  }
 
  openMenu(e) {
    this.menu.open(e)
  }
 
}
