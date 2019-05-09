import { Component, OnInit } from '@angular/core';
import { ServiceTagService } from '../services/service-tag.service';
import { ConfigurationService } from '../services/data-services/configuration.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  protocol = 'opc-ua';
  highestAddress: number = 0;
  totalMemory: number = 0;
  numberOfTags: number = 0;
  opcUANamespaceUri = ""

  constructor(public tagService: ServiceTagService, public config: ConfigurationService) { }

  ngOnInit() {

    this.config.updateDisplayEvent.subscribe(() => {
      this.highestAddress = this.config.getHighestAddress();
      this.totalMemory = this.config.getTotalSize();
      this.numberOfTags = this.config.getHighestAdi();

    });

  }
  updateProtocol() {
    this.tagService.updateTableCol(this.protocol);
    this.config.setProtocol(this.protocol);
  }


}
