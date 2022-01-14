import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAddPostTableComponent } from '../modal-add-post-table/modal-add-post-table.component';


@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css']
})
export class PostTableComponent implements OnInit {

  @ViewChild(ModalAddPostTableComponent) menu:ModalAddPostTableComponent 
 
  openMenu(e) {
    this.menu.open(e)
  }

  ngOnInit(): void {
    
  }


}
