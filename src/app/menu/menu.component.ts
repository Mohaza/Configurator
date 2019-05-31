import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material';
import { DialogTagComponent } from '../dialog-tag/dialog-tag.component';
import { ServiceTagService } from '../services/service-tag.service';
import { ButtonSettingsService } from '../services/button-settings.service';
import { ConfigurationXmlService } from '../services/data-services/configuration-xml.service';
import { ConfigurationReaderService } from '../services/data-services/configuration-reader.service';
import { ConfigurationService } from '../services/data-services/configuration.service';
import { DialogFtpComponent } from '../dialog-ftp/dialog-ftp.component';





@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  
  public buttonsBool : boolean = true;
  public isEmpty : boolean = true;

  constructor(public dialog: MatDialog, public tagService: ServiceTagService, public buttonService: ButtonSettingsService,
     public configXml: ConfigurationXmlService, public configReader: ConfigurationReaderService, 
     public config: ConfigurationService) { 

  }

  ngOnInit() {

    this.buttonService.disableButtonsSubject.subscribe(()=>{
      this.buttonsBool = true;
    });
    this.buttonService.enableButtonsSubject.subscribe(()=>{
      this.buttonsBool =false;
    });
    this.buttonService.fileButtonsSubject.subscribe(()=>{
      if(this.config.getAdiList().length ===0 ){
        this.isEmpty = true;
      }
      else{
        this.isEmpty = false;
      }
      

    })
   
  }

  ngOnDestroy(): void {
    this.buttonService.enableButtonsSubject.unsubscribe();    
   
  }
  openTag(){
    let tagRef = this.dialog.open(DialogTagComponent, {
      width: '600px', disableClose: true,
      data : {}
    });
    tagRef.afterClosed().subscribe(result => {
      if(result == 'Confirm'){
        this.isEmpty = false;

      }
      //Restart dialog tag
      else if(result == 'Return'){
        this.openTag();
        this.isEmpty = false;
      }
    })

  }
  removeTag(){
    this.tagService.removeTag();
    if(this.buttonService.getRowSelection() == -1){
      this.buttonsBool = true;

    }
    if(this.config.getAdiList().length === 0){
      this.isEmpty = true;
    }
    this.tagService.updateDisplay();
  }
  modifyTag(){
      this.tagService.setModifyMode(true);
      var row : any = this.tagService.getRowData();
      let tagRef = this.dialog.open(DialogTagComponent, {
      width: '600px', disableClose: true,
      data :{
        tagName : row.name,
        dataType : row.dataType,
        numEle : row.elements,
        startAddress : row.startAddress
      }     
    });
    tagRef.afterClosed().subscribe(result => {
      console.log(result);
      //Restart dialog tag
      if(result == 'Return'){
        this.openTag();
      }
    })
  }

  resetTags(){
    this.tagService.resetTags();
    this.config.setAdiInstanceNum(0)
    this.config.setTotalSize(0);
    this.config.setHighestAddress(0);
    this.config.setHighestAdi(0);
    this.config.getAddress().length = 0;
    this.tagService.updateDisplay();
    this.isEmpty = true;
    this.buttonsBool = true;

  }

  generateXml(){
      var fileName = "adicfg"
      this.config.getAdiList().sort((a,b)=>a.getStartAddress()-b.getStartAddress());
      this.configXml.CreateConfigurationXml(fileName);

  }

  onFileSelected(event : any){
    let selectedFile = event.target.files[0];
    this.configReader.readConfiguration(selectedFile);
    

  }
  openFtp(){
    this.dialog.open(DialogFtpComponent,{
      disableClose: true
    })
  }

}
