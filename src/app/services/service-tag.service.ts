import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ServiceTagService {

  public newTagSubject = new Subject<any>();

  startAddress: number;
  endAddress: number;

  constructor() {
    
   }

   addTag(data:any[]){

    this.newTagSubject.next(data);
   }
   newStartAddress(num : number){
    return this.startAddress += num;
   }
   newEndAddress(num : number){
    return this.endAddress += num;
  }
}
