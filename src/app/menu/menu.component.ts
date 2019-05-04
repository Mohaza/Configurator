import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material';
import { DialogTagComponent } from '../dialog-tag/dialog-tag.component';
import { ServiceTagService } from '../services/service-tag.service';
import { ButtonSettingsService } from '../services/button-settings.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  
  public buttonsBool : boolean = true;

  constructor(public tag: MatDialog, public tagService: ServiceTagService, public buttonService: ButtonSettingsService) { 

  }

  ngOnInit() {


    this.buttonService.enableButtonsSubject.subscribe(()=>{
      this.buttonsBool =false;
    });
   
  }

  ngOnDestroy(): void {
    this.buttonService.enableButtonsSubject.unsubscribe();    
   
  }
  openTag(){
    let tagRef = this.tag.open(DialogTagComponent, {
      width: '600px', disableClose: true,
      data : {}
    });
    tagRef.afterClosed().subscribe(result => {
      //Restart dialog tag
      if(result == 'Return'){
        this.openTag();
      }
    })

  }
  removeTag(){
    this.tagService.removeTag();
    if(this.buttonService.getRowSelection() == -1){
      this.buttonsBool = true;

    }
  }
  modifyTag(){
      this.tagService.setModifyMode(true);
      var row : any = this.tagService.getRowData();
      let tagRef = this.tag.open(DialogTagComponent, {
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

  }

}
