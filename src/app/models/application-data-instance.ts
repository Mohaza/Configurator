import { DataType } from './data-type';

 
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
    private opcUANodeIdentifier : number;

    getName(){return this.name}
    setName(n : string){this.name = n}
    getOffset(){return this.offset}
    setOffset(num : number){this.offset = num}
    getAdiNumber(){return this.adiNumber}
    setAdiNumber(num : number){this.adiNumber = num}
    getOpcUANodeIdentifier(){ return this.opcUANodeIdentifier; }
    setOpcUANodeIdentifier(nodeId : number){ this.opcUANodeIdentifier = nodeId;}

    getDataTypeSize(){return this.dataType.size}
    getEndAddress(){return this.offset + this.dataType.size -1;}
    getTotalBytes(){
        return this.dataType.size * ((this.numberOfSubelements === 0 ) ? this.numberOfElements : this.numberOfSubelements)
    }
    getElementsNumber(){
        return (this.numberOfSubelements === 0 ) ? this.numberOfElements : this.numberOfSubelements
    }

    //SingleElement //ArrayElement

    private  dataType : DataType ;
    private numberOfSubelements : number = 0;
    private numberOfElements : number = 1;
    private accessRights : string = "1"//Gateway to OPC-UA/MQTT 
    //TypeOfData = dataType;

    getDataType(){return this.dataType}
    setDataType(data : DataType){this.dataType = data;/* this.dataTypeId */}
    getNumberOfSubelements(){return this.numberOfSubelements}
    setNumberOfSubelements(n :number){this.numberOfSubelements = n}
    getNumberOfElements(){return this.numberOfElements}
    setNumberOfElements(num : number){this.numberOfElements = num}
    getAccessRights(){return this.accessRights}
    setAccessRights(dir : string){this.accessRights = dir}


    constructor(dataType: DataType, numElements :number, adiName: string , direction : string ){
        this.dataType = dataType;
        this.name =adiName;
        this.accessRights = direction;

        if(dataType.name === 'OCTET' || dataType.name === 'CHAR'){
            numElements = numElements<MinimumNumberOfSubelements ? MinimumNumberOfSubelements : numElements;
            numElements = numElements>MaximumNumberOfSubelements ? MaximumNumberOfSubelements : numElements;
            this.numberOfSubelements = numElements;
        }
        else{
            numElements = numElements<MinimumNumberOfElements ? MinimumNumberOfElements : numElements;
            numElements = numElements>MaximumNumberOfElements ? MaximumNumberOfElements : numElements;
            this.numberOfElements = numElements;
        }

    }
  /*  //baseElement
    convertBitsToBytes(numberOfBits : number)
    {
        return (numberOfBits + HighestBitIndexPerByte) / BitsPerByte;
    }
*/
}
