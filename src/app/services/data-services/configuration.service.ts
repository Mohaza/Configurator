import { Injectable} from '@angular/core';
import { ApplicationDataInstance } from 'src/app/models/application-data-instance';
import { DataType } from '../../models/data-type';
import { TagElement } from 'src/app/models/tag-element';


@Injectable({
  providedIn: 'root'
})


export class ConfigurationService {
 //configuration


 
 dataTypes : DataType[] = [ 
  {name: 'BOOL',size: 1, id:0},{name: 'SINT8',size: 1, id:1 },{ name: 'SINT16', size: 2 , id:2},
  {name: 'SINT32',size: 4, id:3 },{name: 'UINT8',size: 1, id:4 },{name: 'UINT16',size: 2, id:5},
  {name: 'UINT32',size: 4, id:6},{name: 'CHAR',size: 1, id:7 },{name: 'BITS8',size: 1, id:9 },
  {name: 'BITS16',size: 2, id:10 },{name: 'BITS32',size: 4, id:11},{name: 'OCTET',size: 1 , id:12},
  {name: 'FLOAT',size: 4, id:18} 
]
  private protocol :string
  private  opcUANamespaceUri :string;
//ApplicationDataObject
  private adiList : ApplicationDataInstance[] = [];
  private highestAddress : number = 0;
  private highestAdi : number = 0;
  private totalSize : number = 0;

  private adiInstanceNum :number = 0;
  private address : boolean[] = []



  constructor() { }

  
  

  findAdi(tagElement: TagElement ){
    let adiObject =this.adiList.find(x => x.getOpcUANodeIdentifier() === tagElement.nodeID)
    return adiObject;
  }
  
  getAdiInstanceNum(){
    return this.adiInstanceNum;
  }
  setAdiInstanceNum(num : number){
    this.adiInstanceNum = num;
  }
  setAddress(addr : boolean[]){
    this.address = addr;
  }
  getAddress(){
    return this.address
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
  getAvailableStartAddr(size:number){
    let count = 0;
    console.log(size)
    for(let i = 0; i < 10000; i++){
      if(this.address[i]==undefined){
        count++;
        console.log(count)
        if(count == size){
          return i-count+1;
        }
      }
      else{
        count = 0;
      }
    }

  }
  setStartAddress(start:number,size:number){
    for(let i = start; i <= size; i++){
      this.address[i] = true;
    }
    console.log(this.address);

  }
  removeStartAddress(start:number,size:number){
    for(let i = start; i <= size; i++){
      this.address[i] = undefined;
    }
    console.log(this.address);

  }
  setManuallyStartAddr(start : number, end: number){
    var count = 0;
    var totalAddr = start+ end;
    for(let i = 0; i < i+1; i++){
      if(!this.address[i]){
        count++;
      }
      else{
        count = 0;
      }
    }

  }
  addAdi(adi : ApplicationDataInstance){
    this.highestAdi++
    this.adiInstanceNum++;
    this.totalSize +=adi.getTotalBytes();

    this.setStartAddress(adi.getStartAddress(),adi.getEndAddress());

    if(this.highestAddress < adi.getEndAddress()){
      this.highestAddress = adi.getEndAddress();
    }

    adi.setAdiNumber(this.adiInstanceNum);
    adi.setOpcUANodeIdentifier(this.adiNumberToOpcUANodeIdentifier(this.adiInstanceNum));
    this.adiList.push(adi);

  }
  removeAdi(adi:ApplicationDataInstance){
    console.log(adi);
    this.highestAdi--;
    this.totalSize -= adi.getTotalBytes();
    this.removeStartAddress(adi.getStartAddress(),adi.getEndAddress())
    let index =this.adiList.findIndex(x => x.getAdiNumber() === adi.getAdiNumber());
    this.adiList.splice(index,1);
    this.highestAddress = 0;
    for(let i of this.adiList){
      this.highestAddress = i.getEndAddress() > this.highestAddress ? this.highestAddress = i.getEndAddress() : this.highestAddress;
    }


  }
  //sätt tillbaka allt från dialog-tag, samt fixa address genom modifiera
  modifyAdi(adi : ApplicationDataInstance,index: number){
    this.adiList[index] = adi;

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
