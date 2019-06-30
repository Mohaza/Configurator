import { Component, OnInit } from '@angular/core';
import { ServiceTagService } from '../services/service-tag.service';
import { ConfigurationService } from '../services/data-services/configuration.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
/// <summary>
///     A component representing the information display.
/// </summary>
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
  /// <summary>
  ///     Method to update protocol.
  /// </summary>
  updateProtocol() {
    this.tagService.updateTableCol(this.protocol);
    this.config.setProtocol(this.protocol);
  }
  /// <summary>
  ///     Method to update OPC-UA namespace URI.
  /// </summary>
  updateOpcUaName(){
    this.config.setOpcUANamespaceUri(this.opcUANamespaceUri);
  }


}
