import { DataType } from './data-type';


const MinimumNumberOfElements: number = 1;
const MaximumNumberOfElements: number = 255;


const MinimumNumberOfSubelements: number = 1;
const MaximumNumberOfSubelements: number = 255;



/// <summary>
///     A class representing the structure of adi.
/// </summary>
export class ApplicationDataInstance {
    private startAddress: number;
    private name: string;
    private adiNumber: number;
    private opcUANodeIdentifier: number;
    private dataType: DataType;
    private numberOfSubelements: number = 0;
    private numberOfElements: number = 1;
    private accessRights: string = "1"//Gateway to OPC-UA/MQTT 
    private direction: string = "Gateway to OPC-UA/MQTT"

    /// <summary>
    ///     get and set the adi name.
    /// </summary>
    /// <param name="n">Name of the adi.</param>
    getName() { return this.name }
    setName(n: string) { this.name = n }

    /// <summary>
    ///     get and set the start address.
    /// </summary>
    /// <param name="num">The start address number.</param>
    getStartAddress() { return this.startAddress }
    setStartAddress(num: number) { this.startAddress = num }

    /// <summary>
    ///     get and set the adi number.
    /// </summary>
    /// <param name="num">The adi number.</param>
    getAdiNumber() { return this.adiNumber }
    setAdiNumber(num: number) { this.adiNumber = num }

    /// <summary>
    ///     get and set OPC-UA node id.
    /// </summary>
    /// <param name="num">The node id number.</param>
    getOpcUANodeIdentifier() { return this.opcUANodeIdentifier; }
    setOpcUANodeIdentifier(nodeId: number) { this.opcUANodeIdentifier = nodeId; }

    /// <summary>
    ///     get data type size.
    /// </summary>
    getDataTypeSize() { return this.dataType.size }

    /// <summary>
    ///     get data type size.
    /// </summary>
    getEndAddress() { return this.startAddress + this.getTotalBytes() - 1; }

    /// <summary>
    ///     get total byte size.
    /// </summary>
    getTotalBytes() {
        return this.dataType.size * ((this.numberOfSubelements === 0) ? this.numberOfElements : this.numberOfSubelements)
    }

    /// <summary>
    ///     get and set elements or subelements number.
    /// </summary>
    /// <param name="num">The number of elements or subelements.</param>
    setElementsNumber(num: number) {
        if (this.dataType.name === 'OCTET' || this.dataType.name === 'CHAR') {
            num = num < MinimumNumberOfSubelements ? MinimumNumberOfSubelements : num;
            num = num > MaximumNumberOfSubelements ? MaximumNumberOfSubelements : num;
            this.numberOfSubelements = num;
        }
        else {
            num = num < MinimumNumberOfElements ? MinimumNumberOfElements : num;
            num = num > MaximumNumberOfElements ? MaximumNumberOfElements : num;
            this.numberOfElements = num;
        }

    }
    getElementsNumber() {
        return (this.numberOfSubelements === 0) ? this.numberOfElements : this.numberOfSubelements
    }

    /// <summary>
    ///     get and set data type.
    /// </summary>
    /// <param name="data">The DataType object.</param>
    getDataType() { return this.dataType }
    setDataType(data: DataType) { this.dataType = data; }

    /// <summary>
    ///     get the number of subelements.
    /// </summary>
    getNumberOfSubelements() { return this.numberOfSubelements }

    /// <summary>
    ///     get the number of elements.
    /// </summary>
    getNumberOfElements() { return this.numberOfElements }

    /// <summary>
    ///     get and set the access rights.
    /// </summary>
    /// <param name="dir">The access right string.</param>
    getAccessRights() { return this.accessRights }
    setAccessRights(dir: string) {
        this.accessRights = dir
        this.direction = this.accessRights === "1" ? 'Gateway to OPC-UA/MQTT' : 'Unknown'
    }

    /// <summary>
    ///     get the direction string.
    /// </summary>
    getDirection() { return this.direction; }

    /// <summary>
    ///     Initializes a new instance of the ApplicationDataInstance class.
    /// </summary>
    /// <param name="dataType">The data type of the element.</param>
    /// <param name="number">The number of elements.</param>
    /// <param name="adiName">The adi name.</param>
    /// <param name="direction">The direction name.</param>

    constructor(dataType: DataType, numElements: number, adiName: string, direction: string) {
        this.dataType = dataType;
        this.name = adiName;
        this.setAccessRights(direction);
        this.setElementsNumber(numElements);

    }
}
