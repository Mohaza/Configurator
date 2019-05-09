import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationReaderService {

    private reader = new FileReader();

    
  constructor() { }

  readConfiguration(file : any){
    let sXML : string
    this.reader.onload = () =>{
      console.log(this.reader.result);
      
    }
    this.reader.readAsBinaryString(file);

  }

}
