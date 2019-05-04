import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  defaultProtocol = 'opc-ua';
  highestAddress : number = 0;
  totalMemory : number = 0;
  numberOfTags : number = 0;

  constructor() { }

  ngOnInit() {
  }

  
}
