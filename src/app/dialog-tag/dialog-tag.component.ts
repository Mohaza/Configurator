import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  addressOption = 'auto';
  dataTypes: DataType[];
  selectedDataType: DataType;
  numOfElements = 1;
  startAddress = 0;
  tagName = "";
  endAddress = 0;

  occupiedAddress: boolean = false;
  totalBytes: number

  constructor(public tagRef: MatDialogRef<DialogTagComponent>, public tagService: ServiceTagService, public config: ConfigurationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataTypes = this.config.dataTypes;
    //this.totalBytes = this.config.getTotalSize();


    if (this.tagService.getModifyMode()) {
      console.log("Name: " + data.tagName, " Name of data: " + data.dataType, " Num: " + data.numEle, " startAddr: " + data.startAddress);
      this.tagName = data.tagName;
      this.selectedDataType = this.config.dataTypes.find(x => x.name === data.dataType);
      this.numOfElements = data.numEle;
      this.startAddress = data.startAddress;
      this.config.removeStartAddress(data.startAddress,data.startAddress+(data.numEle*this.selectedDataType.size)-1)
    }
    else {
      this.selectedDataType = this.config.dataTypes[0];
      this.checkValues();
      //this.startAddress = this.config.getAvailableStartAddr(this.numOfElements * this.selectedDataType.size)
    }


  }

  ngOnInit() {


  }
  sendRow() {
    if (this.tagService.getModifyMode()) {
      //old adi
      let adi = this.config.findAdi(this.tagService.getRowData())
      this.config.recoverFromAdi(adi);

      let index = this.config.getAdiList().findIndex(x => x.getAdiNumber() === adi.getAdiNumber());
      //new adi
      adi.setStartAddress(this.startAddress)
      adi.setDataType(this.selectedDataType);
      adi.setElementsNumber(this.numOfElements);
      adi.setName(this.tagName);
      adi.setAccessRights(this.direction);

      this.config.modifyAdi(adi, index);
      this.tagService.updateDisplay();
      this.tagService.modifiedTag(adi);
      this.tagService.setModifyMode(false);
    }
    else {
      let adi = new ApplicationDataInstance(this.selectedDataType, this.numOfElements, this.tagName, this.direction);
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

  onCloseReturn() {
    this.sendRow();
    this.tagRef.close('Return');

  }
  onCloseCancel() {

    if (this.tagService.getModifyMode()) {
      //original address of row
      let totalSize = this.data.numEle*this.config.dataTypes.find(x => x.name === this.data.dataType).size
      this.config.setStartAddress(this.data.startAddress,this.data.startAddress+totalSize-1)

       this.tagService.setModifyMode(false); 
    }

    this.tagRef.close('Cancel');
  }
  checkValues() {
    this.numOfElements = !this.numOfElements ? 1 : this.numOfElements;
    this.numOfElements = this.numOfElements > 255 ? 255 : this.numOfElements;
    this.totalBytes = this.config.getTotalSize() + (this.selectedDataType.size * this.numOfElements);
    if (this.addressOption === 'manually') {
      //härrr
      this.occupiedAddress = this.config.occupiedAddress(this.startAddress,this.numOfElements * this.selectedDataType.size+this.startAddress)
    }
    else {
      if(this.tagService.getModifyMode()){
        this.startAddress = this.data.startAddress;
      }
      else{
        this.startAddress = this.config.getAvailableStartAddr(this.numOfElements * this.selectedDataType.size)
      }
      this.occupiedAddress = false;

    }
    

  }


}
