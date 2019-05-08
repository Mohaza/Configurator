import { Injectable } from '@angular/core';
import { ApplicationDataInstance } from 'src/app/models/application-data-instance';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
 //configuration
  private protocol :string
  private  opcUANamespaceUri :string;
//ApplicationDataObject
  private adiList : ApplicationDataInstance[];
  private highestAddress : number = 0;
  private highestAdi : number = 0;
  private totalSize : number = 0;


  constructor() { }

  getProtocol(){
    return this.protocol;
  }
  setProtocol(protocol : string ){
    this.protocol = protocol;
  }
  getOpcUANamespaceUri(){
    return this.opcUANamespaceUri;
  }
  setOpcUANamespaceUri(namespaceUri : string ){
    this.opcUANamespaceUri = namespaceUri;
  }

  getAdiList(){
    return this.adiList;
  }
  setAdiList(adiList : any[] ){
    this.adiList = adiList;
  }
  addAdi(adi : ApplicationDataInstance){
    this.setHighestAdi(this.highestAdi++)
    adi.setAdiNumber(this.highestAdi);//fortsätt
    this.adiList.push(adi);

  }
  getHighestAddress(){
    return this.highestAddress;
  }
  setHighestAddress(num : number ){
    this.highestAddress = num;
  }
  getHighestAdi(){
    return this.highestAdi;
  }
  setHighestAdi(num : number ){
    this.highestAdi = num;
  }
  getTotalSize(){
    return this.totalSize;
  }
  setTotalSize(num : number ){
    this.totalSize = num;
  }

}
