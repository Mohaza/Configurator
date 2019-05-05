import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationXmlService {
 
  private  ValueAttribute: string = "Value";
    
  private  RootElement: string = "Configuration";
  
  private  CreatedAttribute: string = "Created";
  
  private  EnabledProtocolElement: string = "EnabledProtocol";
  
  private  ProtocolElement: string = "Protocol";
  
  private  OpcAttributeValue: string = "OPC-UA";
  
  private  MqttAttributeValue: string = "MQTT";
  
  private  OpcElement: string = "OpcUa";
  
  private  OpcUANamespaceUriElement: string = "AppLocalNamespaceURI";
  
  private  ApplicationDataObjectElement: string = "AbccObject";
  
  private  ObjectNbrElement: string = "ObjectNbr";
  
  private  ApplicationDataObjectNbrAttributeValue: string = "0xFE";
  
  private  AdiElement: string = "AbccInstance";
  
  private  AdiNumberElement: string = "InstanceNbr";
  
  private  NameElement: string = "Name";
  
  private  NbrOfElementsElement: string = "NumberOfElements";
  
  private  BitOffsetElement: string = "BitOffsetDataToIIOT";
  
  private  NumberOfBitsInByte: number = 8;
  
  private  BaseElementElement: string = "Element";
  
  private  DataTypeElement: string = "DataType";
  
  private  DescriptorElement: string = "Descriptor";
  
  private  NbrOfSubelementsElement: string = "NumberOfSubelements";
  
  private  NoSubelementsValue: string = "0";
  
  constructor() {
    
  }
}
