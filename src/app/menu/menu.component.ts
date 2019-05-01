import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { DialogTagComponent } from '../dialog-tag/dialog-tag.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(public tag: MatDialog) { }

  ngOnInit() {
  }
  openTag(){
    let tagRef = this.tag.open(DialogTagComponent, {
      width: '600px', disableClose: true
    });
    tagRef.afterClosed().subscribe(result => {
      //Restart dialog tag
      if(result == 'Return'){
        this.openTag();
      }
    })

  }
}
