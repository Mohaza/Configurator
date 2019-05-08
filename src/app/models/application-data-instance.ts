 
//ArrayElement
const MinimumNumberOfElements: number = 1;
const MaximumNumberOfElements : number = 255; 

 
 //SingleElement, It is only allowed to create a string or octet with subelements
 const  MinimumNumberOfSubelements : number = 1;
 const MaximumNumberOfSubelements : number = 255;

 
 //BaseElement;
 const BitsPerByte : number = 8;
 const HighestBitIndexPerByte : number = BitsPerByte - 1;

export class ApplicationDataInstance {
//ApplicationDataInstance
    private offset : number;
    private name : string;
    private  adiNumber : number;

    getName(){return this.name}
    setName(n : string){this.name = n}
    getOffset(){return this.offset}
    setOffset(num : number){this.offset = num}
    getAdiNumber(){return this.adiNumber}
    setAdiNumber(num : number){this.adiNumber = num}

    getSize(){return this.size}
    getEndAddress(){
        return this.offset + this.size -1;
    }

    //SingleElement //ArrayElement

    private dataTypeId : number;
    private  dataType ;
    private numberOfSubelements : number;
    private numberOfElements : number;
    private size : number
    private accessRights : number = 1//Gateway to OPC-UA/MQTT 
    //TypeOfData = dataType;

    getDataType(){return this.dataType}
    setDataType(data){this.dataType = data;/* this.dataTypeId */}
    getNumberOfSubelements(){return this.numberOfSubelements}
    setNumberOfSubelements(n :number){this.numberOfSubelements = n}
    getNumberOfElements(){return this.numberOfElements}
    setNumberOfElements(num : number){this.numberOfElements = num}
    getAccessRights(){return this.accessRights}
    setAccessRights(dir : number){this.accessRights = dir}


    constructor(){

    }
  /*  //baseElement
    convertBitsToBytes(numberOfBits : number)
    {
        return (numberOfBits + HighestBitIndexPerByte) / BitsPerByte;
    }
*/
}
