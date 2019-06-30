import { Injectable} from '@angular/core';
import { ApplicationDataInstance } from 'src/app/models/application-data-instance';
import { DataType } from '../../models/data-type';
import { TagElement } from 'src/app/models/tag-element';


@Injectable({
  providedIn: 'root'
})

/// <summary>
///     A service class representing the current configuration.
/// </summary>
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

  
  
  /// <summary>
  ///     find and get the adi with the same node id as TagElement.
  /// </summary>
  /// <param name="tagElement">The TagElement displayed in table representing adi.</param>
  findAdi(tagElement: TagElement ){
    let adiObject =this.adiList.find(x => x.getOpcUANodeIdentifier() === tagElement.nodeID)
    return adiObject;
  }
  /// <summary>
  ///     get and set the adi number.
  /// </summary>
  /// <param name="num">The number.</param>
  setAdiInstanceNum(num : number){
    this.adiInstanceNum = num;
  }
  getAdiInstanceNum(){
    return this.adiInstanceNum;
  }
  
  /// <summary>
  ///     get and set the address
  /// </summary>
  /// <param name="addr">The address array.</param>
  setAddress(addr : boolean[]){
    this.address = addr;
  }
  getAddress(){
    return this.address
  }

  /// <summary>
  ///     get and set the protocol
  /// </summary>
  /// <param name="protocol">Name of the protocol.</param>
  setProtocol(protocol : string ){
    this.protocol = protocol;
  }
  getProtocol(){
    return this.protocol;
  }
  
  /// <summary>
  ///     get and set the OPC-UA namespace URI
  /// </summary>
  /// <param name="namespaceUri">The namespace URI.</param>
  setOpcUANamespaceUri(namespaceUri : string ){
    this.opcUANamespaceUri = namespaceUri;
  }
  getOpcUANamespaceUri(){
    return this.opcUANamespaceUri;
  }

  /// <summary>
  ///     get and set adi array
  /// </summary>
  /// <param name="adiList">The adi array.</param>
  setAdiList(adiList : ApplicationDataInstance[] ){
    this.adiList = adiList;
  }
  getAdiList(){
    return this.adiList;
  }
  /// <summary>
  ///     get the first available start address
  /// </summary>
  /// <param name="size">The size of the adi.</param>
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
  /// <summary>
  ///     set the address of the adi
  /// </summary>
  /// <param name="start">The start address of the adi.</param>
  /// <param name="size">The size of the adi.</param>
  setStartAddress(start:number,size:number){
    for(let i = start; i <= size; i++){
      this.address[i] = true;
    }
    console.log(this.address);

  }
  /// <summary>
  ///     delete the address of the adi
  /// </summary>
  /// <param name="start">The start address of the adi.</param>
  /// <param name="size">The size of the adi.</param>
  removeStartAddress(start:number,size:number){
    for(let i = start; i <= size; i++){
      this.address[i] = undefined;
    }
    console.log(this.address);

  }
  /// <summary>
  ///     get the boolean of the address array to disable or enable saving of adi.
  /// </summary>
  /// <param name="start">The start address of the adi.</param>
  /// <param name="size">The size of the adi.</param>
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
  /// <summary>
  ///     update configuration on the adding of adi.
  /// </summary>
  /// <param name="adi">The adi.</param>
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
  /// <summary>
  ///     update configuration on the removing of adi.
  /// </summary>
  /// <param name="adi">The adi.</param>
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

  /// <summary>
  ///     update configuration on the modifying of adi.
  /// </summary>
  /// <param name="adi">The adi.</param>
  /// <param name="index">The index number.</param>
  modifyAdi(adi : ApplicationDataInstance,index: number){
    this.totalSize +=adi.getTotalBytes();
    this.highestAddress = 0;
    for(let adi of this.adiList){
      this.highestAddress = adi.getEndAddress() > this.highestAddress ? this.highestAddress = adi.getEndAddress() : this.highestAddress;
    }
    this.setStartAddress(adi.getStartAddress(),adi.getEndAddress())

    this.adiList[index] = adi;

  }
  recoverFromAdi(adi : ApplicationDataInstance){
    this.totalSize -=adi.getTotalBytes();
    this.removeStartAddress(adi.getStartAddress(),adi.getEndAddress())

  }

  /// <summary>
  ///     get and set highest address number
  /// </summary>
  /// <param name="num">The highest address number.</param>
  setHighestAddress(num : number ){
    this.highestAddress = num;
  }
  getHighestAddress(){
    return this.highestAddress;
  }
    
  /// <summary>
  ///     get and set highest number of adi
  /// </summary>
  /// <param name="num">The highest number of adi.</param>
  setHighestAdi(num : number ){
    this.highestAdi = num;
  }
  getHighestAdi(){
    return this.highestAdi;
  }

  /// <summary>
  ///     get and set total bytes number used
  /// </summary>
  /// <param name="num">The total bytes number.</param>
  setTotalSize(num : number ){
    this.totalSize = num;
  }
  getTotalSize(){
    return this.totalSize;
  }

  /// <summary>
  ///     get the OPC UA node identifier of the converted adi number
  /// </summary>
  /// <param name="adiNumber">The adi number to convert.</param>
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

            const  adiRangeStart      = 0x01000000;  // See SDS-7044-065, version 1.02, table 8.
            const  adiNumberLeftShift = 8;           // See SDS-7044-065, version 1.02, table 8.
            const  currentValueNodeId = 0x00;        // See SDS-7044-065, version 1.02, table 30.

            return adiRangeStart | (adiNumber << adiNumberLeftShift) | currentValueNodeId;
        }

}
