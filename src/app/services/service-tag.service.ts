import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { ApplicationDataInstance } from '../models/application-data-instance';

@Injectable({
  providedIn: 'root'
})


export class ServiceTagService {

  public newTagSubject = new Subject<ApplicationDataInstance>();
  public removeTagSubject = new Subject<any>();
  public modifiedTagSubject = new Subject<ApplicationDataInstance>();
  public resetTagsSubject = new Subject<any>();
  public protocolChangeSubject = new Subject<any>();

  public rowData : any;
  public modifyMode : boolean = false;


  constructor() {
    
   }
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
   
   setRowData(data : any){
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
