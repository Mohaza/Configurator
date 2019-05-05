import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ServiceTagService {

  public newTagSubject = new Subject<any>();
  public removeTagSubject = new Subject<any>();
  public modifiedTagSubject = new Subject<any>();
  public resetTagsSubject = new Subject<any>();
  public rowData : any;
  public modifyMode : boolean = false;


  constructor() {
    
   }
   addTag(data:any[]){

    this.newTagSubject.next(data);
   }
   removeTag(){
     this.removeTagSubject.next();
   }

   modifiedTag(data : any[]){
     this.modifiedTagSubject.next(data);
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
   
  

  
}
