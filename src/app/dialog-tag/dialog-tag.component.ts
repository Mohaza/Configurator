import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { ServiceTagService } from '../services/service-tag.service';

@Component({
  selector: 'app-dialog-tag',
  templateUrl: './dialog-tag.component.html',
  styleUrls: ['./dialog-tag.component.css']
})
export class DialogTagComponent implements OnInit {

  defaultDirection = 'direction1';
  addressOption ='auto';
  dataTypes = [ 
    {name: 'BOOL',size: 1},{name: 'SINT8',size: 1 },{ name: 'SINT16', size: 2 },
    {name: 'SINT32',size: 4 },{name: 'UINT8',size: 1 },{name: 'UINT16',size: 2},
    {name: 'UINT32',size: 4},{name: 'CHAR',size: 1 },{name: 'BITS8',size: 1 },
    {name: 'BITS16',size: 2 },{name: 'BITS32',size: 4},{name: 'OCTET',size: 1 },
    {name: 'FLOAT',size: 4} 
  ]
  selectedDataType = this.dataTypes[0];
  numOfElements = 1;
  startAddress = 0;
  tagName = "";
  endAddress = 0;

  constructor(public tagRef: MatDialogRef<DialogTagComponent>, public tagService: ServiceTagService) { 
  }

  ngOnInit() {
    
  }

  onCloseConfirm() {
    this.updateAddress();
    this.tagService.addTag([this.tagName,this.selectedDataType.name,this.numOfElements,this.startAddress,this.endAddress,777]);
    this.tagRef.close('Confirm');
  }

  onCloseReturn(){
    this.updateAddress();
    this.tagService.addTag([this.tagName,this.selectedDataType.name,this.numOfElements,this.startAddress,this.endAddress,777]);
    this.tagRef.close('Return');

  }
  onCloseCancel() {
    this.tagRef.close('Cancel');
  }

  updateAddress(){
    this.startAddress =this.endAddress;
    this.endAddress= this.endAddress+(this.numOfElements*this.selectedDataType.size)-1;
  }
}
