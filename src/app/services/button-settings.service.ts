import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/// <summary>
///     A service class representing the button observers.
/// </summary>
export class ButtonSettingsService {

  public enableButtonsSubject = new Subject<any>();
  public disableButtonsSubject = new Subject<any>();

  public fileButtonsSubject = new Subject<any>();


  public rowSelected : number;

  constructor() { }

  /// <summary>
  ///     observer to enable or disable file buttons
  /// </summary>
  fileButtons(){
    this.fileButtonsSubject.next();
  }
  /// <summary>
  ///     observer to enable buttons
  /// </summary>
 enableButtons(){
   this.enableButtonsSubject.next();
 }
  /// <summary>
  ///     observer to disable buttons
  /// </summary>
 disableButtons(){
   this.disableButtonsSubject.next();
 }
  /// <summary>
  ///     get and set the current row selection
  /// </summary>
  /// <param name="row">The row number selected.</param>
 setRowSelection(row : number){
   this.rowSelected = row;
 }
 getRowSelection(){
   return this.rowSelected;
 }

}

  
