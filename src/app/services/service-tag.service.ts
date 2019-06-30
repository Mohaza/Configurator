import { Injectable,EventEmitter } from '@angular/core';
import {Subject} from 'rxjs';
import { ApplicationDataInstance } from '../models/application-data-instance';
import { TagElement } from '../models/tag-element';

@Injectable({
  providedIn: 'root'
})

/// <summary>
///     A service class representing the tag observers.
/// </summary>
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
  /// <summary>
  ///     observer to trigger table setup from file 
  /// </summary>
   fileToTable(){
    this.fileToTableSubject.next();
   }
  /// <summary>
  ///     observer to trigger update values on display
  /// </summary>
   updateDisplay(){
    this.updateDisplayEvent.next();
  }

  /// <summary>
  ///     observer to trigger adding adi to table
  /// </summary>
  /// <param name="adi">The adi to be added.</param>
   addTag(adi: ApplicationDataInstance){

    this.newTagSubject.next(adi);
   }
  /// <summary>
  ///     observer to trigger removing adi from table
  /// </summary>
   removeTag(){
     this.removeTagSubject.next();
   }
  /// <summary>
  ///     observer to trigger modifying of adi
  /// </summary>
  /// <param name="adi">The adi to be modified.</param>
   modifiedTag(adi : ApplicationDataInstance){
     this.modifiedTagSubject.next(adi);
   }
  /// <summary>
  ///     observer to trigger reseting of configuration
  /// </summary>
   resetTags(){
     this.resetTagsSubject.next();
   }
  /// <summary>
  ///     observer to trigger the switch of table columns
  /// </summary>
  /// <param name="protocol">The chosen protocol.</param>
   updateTableCol(protocol : string){
    this.protocolChangeSubject.next(protocol);
  }
  /// <summary>
  ///     get and set the selected TagElement
  /// </summary>
  /// <param name="data">The tag data.</param>
   setRowData(data : TagElement){
     this.rowData = data;
   }
   getRowData(){
     return this.rowData;
   }

  /// <summary>
  ///     get and set the boolean of modify mode
  /// </summary>
  /// <param name="bool">The boolean value.</param>
   setModifyMode(bool :boolean){
    this.modifyMode = bool;
   }
   getModifyMode(){
    return this.modifyMode;
   }
   
  

  
}
