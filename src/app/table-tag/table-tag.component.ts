import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ServiceTagService } from '../services/service-tag.service';
import { ButtonSettingsService } from '../services/button-settings.service';
import { ConfigurationService } from '../services/data-services/configuration.service';


export interface tagElement {
  name: string;
  dataType: string;
  elements: number;
  startAddress: number;
  endAddress: number;
  nodeID: number;
}

const ELEMENT_DATA: tagElement[] = [];

@Component({
  selector: 'app-table-tag',
  templateUrl: './table-tag.component.html',
  styleUrls: ['./table-tag.component.css']
})
export class TableTagComponent implements OnInit, OnDestroy {

  OPC_UA: string[] = ['name', 'dataType', 'elements', 'startAddress', 'endAddress', 'nodeID'];
  MQTT: string[] = ['name', 'dataType', 'elements', 'startAddress', 'endAddress'];
  
  selectedRow: number = -1;
  dataSource: MatTableDataSource<tagElement>;
  displayedColumns = this.OPC_UA;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public tagService: ServiceTagService, public buttonService: ButtonSettingsService, public config: ConfigurationService) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.filter = "";

  }

  ngOnInit() {
    this.tagService.newTagSubject.subscribe(adi => {
      this.config.addAdi(adi);
      this.config.updateDisplay();
      ELEMENT_DATA.push({
         name: adi.getName() , dataType: adi.getDataType().name,
         elements: adi.getElementsNumber(), startAddress: adi.getOffset(),
         endAddress: adi.getEndAddress(), nodeID: adi.getOpcUANodeIdentifier() 
      });
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);   
      this.ngAfterViewInit(); 
      this.dataSource.sortData(this.dataSource.filteredData,this.dataSource.sort);
      if(this.selectedRow != -1){
        this.tagService.setRowData(this.dataSource.data[this.selectedRow]);
      }
    })

    this.tagService.removeTagSubject.subscribe(() => {
      ELEMENT_DATA.splice(this.selectedRow, 1);
      this.config.getAdiList().splice(this.selectedRow-1)
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);   
      this.ngAfterViewInit(); 
      this.dataSource.sortData(this.dataSource.filteredData,this.dataSource.sort);

      if (this.selectedRow >= ELEMENT_DATA.length) {
        this.resetRowData();
      }
      else{
        this.tagService.setRowData(this.dataSource.data[this.selectedRow]);
      }
    });

    this.tagService.modifiedTagSubject.subscribe(adi => {
      this.config.getAdiList()[this.selectedRow] = adi;
      ELEMENT_DATA[this.selectedRow] = {
         name: adi.getName(), dataType: adi.getDataType().name,
         elements: adi.getElementsNumber(), startAddress: adi.getOffset(),
         endAddress: adi.getEndAddress(), nodeID: adi.getOpcUANodeIdentifier()
       };
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);   
      this.ngAfterViewInit(); 
      this.dataSource.sortData(this.dataSource.filteredData,this.dataSource.sort);
      
      this.tagService.setRowData(this.dataSource.data[this.selectedRow]);
    })

    this.tagService.resetTagsSubject.subscribe(() => {
      ELEMENT_DATA.length = 0;
      this.config.getAdiList().length = 0;
      this.resetRowData();
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);   
      this.ngAfterViewInit(); 
    })

    this.tagService.protocolChangeSubject.subscribe(protocol =>{
    (protocol === "opc-ua") ? this.displayedColumns =this.OPC_UA : this.displayedColumns =this.MQTT;
    })

  }

  updateData() {
    
    
    this.ngAfterViewInit();
  }
  ngOnDestroy(): void {

    this.tagService.newTagSubject.unsubscribe();
    this.tagService.removeTagSubject.unsubscribe();
    this.tagService.resetTagsSubject.unsubscribe();
    this.tagService.protocolChangeSubject.unsubscribe();

  }
  resetRowData() {
    this.selectedRow = -1;
    this.buttonService.setRowSelection(-1);
    this.tagService.setRowData(null);
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

  }
  sortHeader(){
    this.dataSource.sortData(this.dataSource.filteredData,this.dataSource.sort);
    this.tagService.setRowData(this.dataSource.data[this.selectedRow])
  }

  applyFilter(filterValue: string) {
    if (this.selectedRow > -1) {
      this.resetRowData();
      this.buttonService.disableButtons();
    }
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  setClickedRow(index: number) {
    if (this.dataSource.filter === "") {
      if (this.selectedRow === -1) {
        this.buttonService.enableButtons();
      }
      this.selectedRow = index;
      this.buttonService.setRowSelection(this.selectedRow);
      let row = this.dataSource.data[this.selectedRow];
      this.tagService.setRowData(row);

    }

  }



}
