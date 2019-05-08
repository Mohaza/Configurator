import { Injectable } from '@angular/core';
import { ApplicationDataInstance } from 'src/app/models/application-data-instance';
import {Subject} from 'rxjs';


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

  public updateDisplaySubject = new Subject<any>();



  constructor() { }
  updateDisplay(){
    this.updateDisplaySubject.next();
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
  setAdiList(adiList : any[] ){
    this.adiList = adiList;
  }
  addAdi(adi : ApplicationDataInstance){
    this.highestAdi++
    this.totalSize +=adi.getTotalBytes();
    adi.setOffset(this.highestAddress);
    this.highestAddress += adi.getEndAddress();

    adi.setAdiNumber(this.highestAdi);
    this.adiNumberToOpcUANodeIdentifier(adi.getAdiNumber());
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
