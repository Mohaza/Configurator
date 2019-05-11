import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceTagService } from '../services/service-tag.service';
import { DataType } from '../models/data-type';
import { ApplicationDataInstance } from '../models/application-data-instance';
import { ConfigurationService } from '../services/data-services/configuration.service';

@Component({
  selector: 'app-dialog-tag',
  templateUrl: './dialog-tag.component.html',
  styleUrls: ['./dialog-tag.component.css']
})
export class DialogTagComponent implements OnInit {
  

  direction = "1";
  addressOption ='auto';
  dataTypes : DataType[];
  selectedDataType : DataType;
  numOfElements = 1;
  startAddress = 0;
  tagName = "";
  endAddress = 0;

  

  constructor(public tagRef: MatDialogRef<DialogTagComponent>, public tagService: ServiceTagService,public config: ConfigurationService,
    @Inject(MAT_DIALOG_DATA) public data :any) {
      this.dataTypes = this.config.dataTypes;
      
      
      if(this.tagService.getModifyMode()){
        console.log("Name: " + data.tagName, " Name of data: " + data.dataType, " Num: " + data.numEle," startAddr: " + data.startAddress);
        this.tagName = data.tagName;
        this.selectedDataType = this.config.dataTypes.find(x => x.name === data.dataType);
        this.numOfElements = data.numEle;
        this.startAddress = data.startAddress;


      }
      else{
        this.selectedDataType = this.config.dataTypes[0];
        this.startAddress= this.config.getAvailableStartAddr(this.numOfElements*this.selectedDataType.size)
      }
      
    
  }

  ngOnInit() {

  
  }
  sendRow(){
    if(this.tagService.getModifyMode()){
      let adi = this.config.findAdi(this.tagService.getRowData())
      let index =this.config.getAdiList().findIndex(x => x.getAdiNumber()===adi.getAdiNumber());
      console.log(index);
      adi.setStartAddress(this.startAddress)
      adi.setDataType(this.selectedDataType);
      adi.setElementsNumber(this.numOfElements);
      adi.setName(this.tagName);
      adi.setAccessRights(this.direction);
      
      this.config.modifyAdi(adi,index);
      this.tagService.modifiedTag(adi);
      this.tagService.setModifyMode(false);
    }
    else{
      let adi =new ApplicationDataInstance(this.selectedDataType, this.numOfElements,this.tagName, this.direction);
      adi.setStartAddress(this.startAddress);
      this.config.addAdi(adi);
      this.tagService.updateDisplay();
      this.tagService.addTag(adi);
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

    if(this.tagService.getModifyMode()){ this.tagService.setModifyMode(false); }

    this.tagRef.close('Cancel');
  }
  checkAddr(){
    if(this.addressOption==='manually'){

    }
    else{
     this.startAddress= this.config.getAvailableStartAddr(this.numOfElements*this.selectedDataType.size)


    }
  }

  
}
