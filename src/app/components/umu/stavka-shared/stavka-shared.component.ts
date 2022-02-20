import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stavka-shared',
  templateUrl: './stavka-shared.component.html',
  styleUrls: ['./stavka-shared.component.css']
})
export class StavkaSharedComponent implements OnInit {

  term: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
