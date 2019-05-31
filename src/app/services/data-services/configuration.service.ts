import { Injectable} from '@angular/core';
import { ApplicationDataInstance } from 'src/app/models/application-data-instance';
import { DataType } from '../../models/data-type';
import { TagElement } from 'src/app/models/tag-element';


@Injectable({
  providedIn: 'root'
})

//configuration
export class ConfigurationService {
 //All datatypes names,sizes and identities
 dataTypes : DataType[] = [ 
  {name: 'BOOL',size: 1, id:0},{name: 'SINT8',size: 1, id:1 },{ name: 'SINT16', size: 2 , id:2},
  {name: 'SINT32',size: 4, id:3 },{name: 'UINT8',size: 1, id:4 },{name: 'UINT16',size: 2, id:5},
  {name: 'UINT32',size: 4, id:6},{name: 'CHAR',size: 1, id:7 },{name: 'BITS8',size: 1, id:9 },
  {name: 'BITS16',size: 2, id:10 },{name: 'BITS32',size: 4, id:11},{name: 'OCTET',size: 1 , id:12},
  {name: 'FLOAT',size: 4, id:18} 
]
//protocol variable
  private protocol :string
//OPC-UA namespace URI variable
  private  opcUANamespaceUri :string;
//list of ApplicationDataInstances(tags)
  private adiList : ApplicationDataInstance[] = [];
//highest address variable
  private highestAddress : number = 0;
//total amount of tags variable
  private highestAdi : number = 0;
//total bytes used variable
  private totalSize : number = 0;
//number of created tags variable
  private adiInstanceNum :number = 0;
//address array variable
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
    for(let i = 0; i < 512; i++){
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
    return 512;

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
  
  occupiedAddress(start : number, size: number){
    if(size-1 > 511){return true}
    for(let i = start; i < size; i++){
      if(this.address[i]){
        console.log(i)
        return true;
      }
    }
    return false;

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
    let adiEndAddress = adi.getEndAddress();
    this.highestAdi--;
    this.totalSize -= adi.getTotalBytes();
    this.removeStartAddress(adi.getStartAddress(),adi.getEndAddress())
    let index =this.adiList.findIndex(x => x.getAdiNumber() === adi.getAdiNumber());
    this.adiList.splice(index,1);
    if(this.highestAddress === adiEndAddress){
      this.highestAddress = 0;
      for(let adi of this.adiList){
      this.highestAddress = adi.getEndAddress() > this.highestAddress ? this.highestAddress = adi.getEndAddress() : this.highestAddress;
      }
    }

  }
  recoverFromAdi(adi : ApplicationDataInstance){
    this.totalSize -=adi.getTotalBytes();
    this.removeStartAddress(adi.getStartAddress(),adi.getEndAddress())
    
  }
  //sätt tillbaka allt från dialog-tag, samt fixa address genom modifiera
  modifyAdi(adi : ApplicationDataInstance,index: number){
    this.totalSize +=adi.getTotalBytes();
    this.highestAddress = 0;
    for(let adi of this.adiList){
      this.highestAddress = adi.getEndAddress() > this.highestAddress ? this.highestAddress = adi.getEndAddress() : this.highestAddress;
    }
    this.setStartAddress(adi.getStartAddress(),adi.getEndAddress())

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
