import { Component, OnInit } from '@angular/core';
import { ServiceTagService } from '../services/service-tag.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  protocol = 'opc-ua';
  highestAddress : number = 0;
  totalMemory : number = 0;
  numberOfTags : number = 0;

  constructor(public tagService : ServiceTagService) { }

  ngOnInit() {
  }

  updateProtocol(){
    this.tagService.updateTableCol(this.protocol);
  }

  
}
