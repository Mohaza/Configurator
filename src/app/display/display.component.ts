import { Component, OnInit } from '@angular/core';
import { ServiceTagService } from '../services/service-tag.service';
import { ConfigurationService } from '../services/data-services/configuration.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  protocol = 'OPC-UA';
  highestAddress: number = 0;
  totalMemory: number = 0;
  numberOfTags: number = 0;
  opcUANamespaceUri = ""

  constructor(public tagService: ServiceTagService, public config: ConfigurationService) { 
    this.config.setOpcUANamespaceUri(this.opcUANamespaceUri);
    this.config.setProtocol(this.protocol)

    
  }

  ngOnInit() {

    this.tagService.updateDisplayEvent.subscribe(() => {
      this.highestAddress = this.config.getHighestAddress();
      this.totalMemory = this.config.getTotalSize();
      this.numberOfTags = this.config.getHighestAdi();
      this.protocol =this.config.getProtocol();
      this.opcUANamespaceUri = this.config.getOpcUANamespaceUri()

    });

  }
  updateProtocol() {
    this.tagService.updateTableCol(this.protocol);
    this.config.setProtocol(this.protocol);
  }
  updateOpcUaName(){
    this.config.setOpcUANamespaceUri(this.opcUANamespaceUri);
  }


}
