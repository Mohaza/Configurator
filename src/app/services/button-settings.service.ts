import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonSettingsService {

  public enableButtonsSubject = new Subject<any>();
  public rowSelected : number;

  constructor() { }

 enableButtons(){
   this.enableButtonsSubject.next();
 }

 setRowSelection(row : number){
   this.rowSelected = row;
 }
 getRowSelection(){
   return this.rowSelected;
 }

}

  
