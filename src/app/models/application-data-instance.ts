import { DataType } from './data-type';

 
//ArrayElement
const MinimumNumberOfElements: number = 1;
const MaximumNumberOfElements : number = 255; 

 
 //SingleElement, It is only allowed to create a string or octet with subelements
 const  MinimumNumberOfSubelements : number = 1;
 const MaximumNumberOfSubelements : number = 255;

 
 //BaseElement;


export class ApplicationDataInstance {
//ApplicationDataInstance
    private startAddress : number;
    private name : string;
    private  adiNumber : number;
    private opcUANodeIdentifier : number;

    getName(){return this.name}
    setName(n : string){this.name = n}
    getStartAddress(){return this.startAddress}
    setStartAddress(num : number){this.startAddress = num}
    getAdiNumber(){return this.adiNumber}
    setAdiNumber(num : number){this.adiNumber = num}
    getOpcUANodeIdentifier(){ return this.opcUANodeIdentifier; }
    setOpcUANodeIdentifier(nodeId : number){ this.opcUANodeIdentifier = nodeId;}

    getDataTypeSize(){return this.dataType.size}
    getEndAddress(){return this.startAddress + this.getTotalBytes()-1;}
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
    setDataType(data : DataType){this.dataType = data;}
    getNumberOfSubelements(){return this.numberOfSubelements}
    getNumberOfElements(){return this.numberOfElements}
    
    setElementsNumber(num : number){
        if(this.dataType.name === 'OCTET' || this.dataType.name === 'CHAR'){
            num = num<MinimumNumberOfSubelements ? MinimumNumberOfSubelements : num;
            num = num>MaximumNumberOfSubelements ? MaximumNumberOfSubelements : num;
            this.numberOfSubelements = num;
        }
        else{
            num = num<MinimumNumberOfElements ? MinimumNumberOfElements : num;
            num = num>MaximumNumberOfElements ? MaximumNumberOfElements : num;
            this.numberOfElements = num;
        }

    }
    getAccessRights(){return this.accessRights}
    setAccessRights(dir : string){this.accessRights = dir}


    constructor(dataType: DataType, numElements :number, adiName: string , direction : string ){
        this.dataType = dataType;
        this.name =adiName;
        this.accessRights = direction;

        this.setElementsNumber(numElements);
        

       
    }
  /*  //baseElement
    convertBitsToBytes(numberOfBits : number)
    {
        return (numberOfBits + HighestBitIndexPerByte) / BitsPerByte;
    }
*/
}
