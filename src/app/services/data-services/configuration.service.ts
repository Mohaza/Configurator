import { Injectable, EventEmitter } from '@angular/core';
import { ApplicationDataInstance } from 'src/app/models/application-data-instance';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
 //configuration
  private protocol :string
  private  opcUANamespaceUri :string;
//ApplicationDataObject
  private adiList : ApplicationDataInstance[] = [];
  private highestAddress : number = 0;
  private highestAdi : number = 0;
  private totalSize : number = 0;

  private adiInstanceNum :number = 0;
private address : boolean[] = []

  public updateDisplayEvent = new EventEmitter<any>(true);


  constructor() { }
  updateDisplay(){
    this.updateDisplayEvent.next();
  }

  checkAddress(start:number){
    
  }

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
  setAdiList(adiList : ApplicationDataInstance[] ){
    this.adiList = adiList;
  }
  addAdi(adi : ApplicationDataInstance){
    this.highestAdi++
    this.adiInstanceNum++;
    this.totalSize +=adi.getTotalBytes();


   // adi.setOffset(this.highestAddress);
    if(this.highestAddress < adi.getEndAddress()){
      this.highestAddress = adi.getEndAddress();
    }

    adi.setAdiNumber(this.adiInstanceNum);
    adi.setOpcUANodeIdentifier(this.adiNumberToOpcUANodeIdentifier(this.adiInstanceNum));
    this.adiList.push(adi);

  }
  //fixa senare
  removeAdi(){
    this.highestAdi--;

  }
  modifyAdi(){

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
  adiNumberToOpcUANodeIdentifier(adiNumber: number)
        {
            // How to calculate the OPC UA node identifier for an ABCC ADI is specified in
            // SDS-7044-065, version 1.02, in chapter 3.3.2, table 8 and in chapter 3.9.1.1, table
            // 30. The formula combines the range (byte 3, MSB), the ADI number (bytes 1 and 2),
            // and the type of value (byte 0, LSB).
            //
            // OPC UA Node identifier = 0x01MMMMNN
            //                            01       ADI range
            //                              MMMM   ADI number
            //                                  NN ADI value type

            const  AdiRangeStart      = 0x01000000;  // See SDS-7044-065, version 1.02, table 8.
            const  AdiNumberLeftShift = 8;           // See SDS-7044-065, version 1.02, table 8.
            const  CurrentValueNodeId = 0x00;        // See SDS-7044-065, version 1.02, table 30.

            return AdiRangeStart | (adiNumber << AdiNumberLeftShift) | CurrentValueNodeId;
        }

}
