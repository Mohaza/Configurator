import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource} from '@angular/material';
import { ServiceTagService } from '../services/service-tag.service';

export interface tagElement {
  name: string;
  dataType: number;
  elements: number;
  startAddress: number;
  endAddress: number;
  nodeID: number;
}

const ELEMENT_DATA: tagElement[] = [
];

@Component({
  selector: 'app-table-tag',
  templateUrl: './table-tag.component.html',
  styleUrls: ['./table-tag.component.css']
})
export class TableTagComponent implements OnInit {
  OPC_UA: string[] = ['name', 'dataType', 'elements', 'startAddress', 'endAddress', 'nodeID'];
  MQTT: string[] = ['name', 'dataType', 'elements', 'startAddress', 'endAddress'];

  dataSource: MatTableDataSource<tagElement>;
  displayedColumns= this.OPC_UA
  
  @ViewChild(MatSort) sort: MatSort;

  constructor(public tagService: ServiceTagService) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

   }

  ngOnInit() {
    this.tagService.newTagSubject.subscribe(data => {
      ELEMENT_DATA.push({name: data[0], dataType: data[1], elements: data[2], startAddress: data[3], endAddress: data[4], nodeID: data[5]},);
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.ngAfterViewInit();
    })

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  

}
