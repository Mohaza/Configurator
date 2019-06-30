import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { ApplicationDataInstance } from 'src/app/models/application-data-instance';
import { DataType } from '../../models/data-type';
import { ServiceTagService } from '../service-tag.service';
import { ButtonSettingsService } from '../button-settings.service';

@Injectable({
  providedIn: 'root'
})
/// <summary>
///     A service class representing the reading of file when uploading an XML file.
/// </summary>
export class ConfigurationReaderService {

  private reader = new FileReader();
  private abccInstance: any;


  constructor(public config: ConfigurationService, public tagService: ServiceTagService, public buttonService: ButtonSettingsService) { }
  /// <summary>
  ///     read XML file then convert to a Document
  /// </summary>
  /// <param name="file">The uploaded XML file.</param>
  readConfiguration(file: any) {
    this.reader.onload = () => {
      //Xml string
      let res = this.reader.result;
      let parser = new DOMParser();
      //From XML string to Document
      let doc = parser.parseFromString(res as string, "application/xml");
      //check the XML file
      this.checkConfiguration(doc);

    }
    //Produce an Array Buffer from file
    this.reader.readAsBinaryString(file);

  }
  /// <summary>
  ///     check that the Document has the essential tags.
  /// </summary>
  /// <param name="doc">The Document of the XML file.</param>
  private checkConfiguration(doc: Document) {
    //retrieve three essential tags from XML file
    var configuration = doc.getElementsByTagName("Configuration")[0];
    var protocol = doc.getElementsByTagName("Protocol")[0];
    this.abccInstance = doc.getElementsByTagName("AbccInstance");
    //if the tags are not included in the xml file, alert a message
    if (protocol === undefined || this.abccInstance === undefined || configuration === undefined) {
      //Incompatible file return alert
      alert("Incompatible configuration-file")
    }
    else {
      this.tagService.resetTags();
      //continue for assembling the xml file
      this.assembleConfiguration(doc);
    }


  }
  /// <summary>
  ///     Assemble the Document tags for setting up its configuration
  /// </summary>
  /// <param name="doc">The Document of the XML file.</param>
  private assembleConfiguration(doc: Document) {
    var protocol = doc.getElementsByTagName("Protocol")[0].getAttribute("Value")
    var appLocalNamespaceURI = doc.getElementsByTagName("AppLocalNamespaceURI")[0].getAttribute("Value")

    //initializing the value variables
    let highestAddress = 0;
    let totalSize = 0;
    let highestAdi = this.abccInstance.length;
    let adiList: ApplicationDataInstance[] = []
    let highestInstanceNum = 0;
    let address = []
    //loop over every ApplicationDataInstance(tag) and retrieve their values.
    for (let i = 0; i < this.abccInstance.length; i++) {
      var instanceNbr = +doc.getElementsByTagName("InstanceNbr")[i].getAttribute("Value")
      var name = doc.getElementsByTagName("Name")[i].getAttribute("Value")
      var numberOfElements = +doc.getElementsByTagName("NumberOfElements")[i].getAttribute("Value")
      var bitOffsetDataToIIOT = +doc.getElementsByTagName("BitOffsetDataToIIOT")[i].getAttribute("Value")
      var dataType = +doc.getElementsByTagName("DataType")[i].getAttribute("Value")
      var descriptor = doc.getElementsByTagName("Descriptor")[i].getAttribute("Value")
      var numberOfSubElements = +doc.getElementsByTagName("NumberOfSubelements")[i].getAttribute("Value")
      let data: DataType = this.config.dataTypes.find(x => x.id === dataType)
      let numberEle = numberOfSubElements === 0 ? numberOfElements : numberOfSubElements;
      let adi = new ApplicationDataInstance(data, numberEle, name, descriptor)
      adiList.push(adi)
      adi.setStartAddress(bitOffsetDataToIIOT / 8)
      adi.setAdiNumber(instanceNbr)
      adi.setOpcUANodeIdentifier(this.config.adiNumberToOpcUANodeIdentifier(adi.getAdiNumber()))
      totalSize += adi.getTotalBytes();
      if (adi.getEndAddress() > highestAddress) {
        highestAddress = adi.getEndAddress();
      }
      highestInstanceNum = highestInstanceNum < instanceNbr ? instanceNbr : highestInstanceNum
      for(let i = adi.getStartAddress(); i <= adi.getEndAddress(); i++){
        address[i] = true
      }
      console.log(name)
    }
    console.log(address)
    //set file values to configuration.service.ts
    this.config.setAddress(address);
    this.config.setAdiInstanceNum(highestInstanceNum)
    this.config.setAdiList(adiList);
    this.config.setHighestAddress(highestAddress)
    this.config.setHighestAdi(highestAdi)
    this.config.setTotalSize(totalSize)
    this.config.setProtocol(protocol)
    this.config.setOpcUANamespaceUri(appLocalNamespaceURI)

    //set up configuration
    this.tagService.updateTableCol(protocol);
    this.tagService.updateDisplay();
    this.tagService.fileToTable();
    this.buttonService.fileButtons();

  }

}
