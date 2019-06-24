import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigurationXmlService} from './configuration-xml.service'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationFtpService {
  responseSubject = new Subject<String>()
  constructor(public configXml : ConfigurationXmlService, public http: HttpClient) { }

  response(res :string){
    this.responseSubject.next(res)
  }
  sendConfig(hostIp:string){
    var config = {
      host: hostIp,
      data: this.configXml.generateXmlToString()
    }
    var http =this.http.post('/server/anonymous',config);
    http.subscribe(data => {
      console.log(data['data']);
      this.response(data['data']);
    },error => {
      console.log(error); 
    })
  }
  sendConfigBasic(hostIp:string,userName:string,pass:string){
    //FTP config aswell as configuration file
    var config = {
      host: hostIp,
      user: userName,
      password: pass,
      data: this.configXml.generateXmlToString()
    }
    //REST http post
    var http =this.http.post('/server/basic',config);
    //response from server
    http.subscribe(data => {
      console.log(data['data']);
      this.response(data['data']);
    },error => {
      console.log(error); 

    })
  }
}
