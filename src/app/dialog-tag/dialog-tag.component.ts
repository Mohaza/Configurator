import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceTagService } from '../services/service-tag.service';
import { DataType } from '../models/data-type';

@Component({
  selector: 'app-dialog-tag',
  templateUrl: './dialog-tag.component.html',
  styleUrls: ['./dialog-tag.component.css']
})
export class DialogTagComponent implements OnInit {
  

  direction = "1";
  addressOption ='auto';
  dataTypes : DataType[] = [ 
    {name: 'BOOL',size: 1, id:0},{name: 'SINT8',size: 1, id:1 },{ name: 'SINT16', size: 2 , id:2},
    {name: 'SINT32',size: 4, id:3 },{name: 'UINT8',size: 1, id:4 },{name: 'UINT16',size: 2, id:5},
    {name: 'UINT32',size: 4, id:6},{name: 'CHAR',size: 1, id:7 },{name: 'BITS8',size: 1, id:9 },
    {name: 'BITS16',size: 2, id:10 },{name: 'BITS32',size: 4, id:11},{name: 'OCTET',size: 1 , id:12},
    {name: 'FLOAT',size: 4, id:18} 
  ]
  selectedDataType = this.dataTypes[0];
  numOfElements = 1;
  startAddress = 0;
  tagName = "";
  endAddress = 0;

  constructor(public tagRef: MatDialogRef<DialogTagComponent>, public tagService: ServiceTagService,
    @Inject(MAT_DIALOG_DATA) public data :any) {

      if(this.tagService.getModifyMode()){
        console.log("Name: " + data.tagName, " Name of data: " + data.dataType, " Num: " + data.numEle," startAddr: " + data.startAddress);
        this.tagName = data.tagName;
        this.selectedDataType = this.dataTypes.find(x => x.name === data.dataType);
        this.numOfElements = data.numEle;
        this.startAddress = data.startAddress;
      }
      
    
  }

  ngOnInit() {

  
  }
  sendRow(){
    if(this.tagService.getModifyMode()){
      this.tagService.modifiedTag([this.tagName,this.selectedDataType.name,this.numOfElements,this.startAddress,this.endAddress,777]);
      this.tagService.setModifyMode(false);
    }
    else{
      this.tagService.addTag([this.tagName,this.selectedDataType.name,this.numOfElements,this.startAddress,this.endAddress,777]);
    }

  }

  onCloseConfirm() {
    this.sendRow();
    this.tagRef.close('Confirm');
  }

  onCloseReturn(){
    this.sendRow();
    this.tagRef.close('Return');

  }
  onCloseCancel() {
    if(this.tagService.getModifyMode()){
      this.tagService.setModifyMode(false);
    }
    this.tagRef.close('Cancel');
  }

  
}
