import { Injectable,EventEmitter } from '@angular/core';
import {Subject} from 'rxjs';
import { ApplicationDataInstance } from '../models/application-data-instance';
import { TagElement } from '../models/tag-element';

@Injectable({
  providedIn: 'root'
})


export class ServiceTagService {
  public updateDisplayEvent = new EventEmitter<any>(true);
  public newTagSubject = new Subject<ApplicationDataInstance>();
  public removeTagSubject = new Subject<any>();
  public modifiedTagSubject = new Subject<ApplicationDataInstance>();
  public resetTagsSubject = new Subject<any>();
  public protocolChangeSubject = new Subject<any>();
  public fileToTableSubject = new Subject<any>();

  public rowData : TagElement;
  public modifyMode : boolean = false;


  constructor() {

    
   }
   fileToTable(){
    this.fileToTableSubject.next();
   }

   updateDisplay(){
    this.updateDisplayEvent.next();
  }
  //A observable method that interacts between dialog-tag.component.ts and table-tag.component.ts
  //parameter is a tag
   addTag(adi: ApplicationDataInstance){

    this.newTagSubject.next(adi);
   }
   removeTag(){
     this.removeTagSubject.next();
   }

   modifiedTag(adi : ApplicationDataInstance){
     this.modifiedTagSubject.next(adi);
   }
   resetTags(){
     this.resetTagsSubject.next();
   }
   
   setRowData(data : TagElement){
     this.rowData = data;
   }
   getRowData(){
     return this.rowData;
   }
   setModifyMode(bool :boolean){
    this.modifyMode = bool;
   }
   getModifyMode(){
    return this.modifyMode;
   }
   updateTableCol(protocol : string){
     this.protocolChangeSubject.next(protocol);
   }
  

  
}
