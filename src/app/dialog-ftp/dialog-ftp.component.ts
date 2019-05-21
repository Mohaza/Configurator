import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ConfigurationFtpService } from '../services/data-services/configuration-ftp.service';

@Component({
  selector: 'app-dialog-ftp',
  templateUrl: './dialog-ftp.component.html',
  styleUrls: ['./dialog-ftp.component.css']
})
export class DialogFtpComponent implements OnInit {
  private host:any;
  private user = "";
  private password ="";
  private logonType = 'basic';
  private isValid: boolean = true;
  isSending: boolean = false;
  constructor(public dialogRef: MatDialogRef<DialogFtpComponent>, public ftp: ConfigurationFtpService) {   }

  ngOnInit() {
   this.ftp.responseSubject.subscribe(res=>{
    this.isSending = false;
    if(res==='Success'){
    //Close on Success
    this.dialogRef.close();
    }
    else{
      alert(res)
    }
     
   })
  }
  sendConfiguration(){
    this.isValid = this.validateIPaddress();
    console.log(this.isValid)
    if(this.isValid){
      this.isSending = true;
      if(this.logonType === 'basic'){
        this.ftp.sendConfigBasic(this.host,this.user,this.password);
      }
      else{
        //anonymously
        console.log('hello')
        this.ftp.sendConfig(this.host)
      }
    }
  }
  onCloseCancel(){
    this.dialogRef.close();
  }
  validateIPaddress() {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.host)) {  
      return true;
    }
    return false;

  }  

}
