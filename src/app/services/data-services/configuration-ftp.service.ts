import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigurationXmlService} from './configuration-xml.service'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/// <summary>
///     A service class representing FTP requests when sending an configuration file.
/// </summary>
export class ConfigurationFtpService {
  responseSubject = new Subject<String>()
  constructor(public configXml : ConfigurationXmlService, public http: HttpClient) { }
  /// <summary>
  ///     observer that triggers a response from the FTP server
  /// </summary>
  /// <param name="res">The response of the FTP server.</param>
  response(res :string){
    this.responseSubject.next(res)
  }
  /// <summary>
  ///     Send current configuration to a anonymous FTP server
  /// </summary>
  /// <param name="hostIp">The IP of the FTP server.</param>
  sendConfig(hostIp:string){
    //IP aswell as configuration
    var config = {
      host: hostIp,
      data: this.configXml.generateXmlToString()
    }
    //REST http post
    var http =this.http.post('/server/anonymous',config);
    //response from server
    http.subscribe(data => {
      console.log(data['data']);
      this.response(data['data']);
    },error => {
      console.log(error); 
    })
  }
  /// <summary>
  ///     Send current configuration to FTP server
  /// </summary>
  /// <param name="hostIp">The IP of the FTP server.</param>
  /// <param name="userName">The username.</param>
  /// <param name="pass">The password.</param>
  sendConfigBasic(hostIp:string,userName:string,pass:string){
    //login settings aswell as configuration
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
