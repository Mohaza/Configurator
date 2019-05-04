import { Component, OnInit,ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource} from '@angular/material';
import { ServiceTagService } from '../services/service-tag.service';
import { ButtonSettingsService } from '../services/button-settings.service';


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
export class TableTagComponent implements OnInit, OnDestroy {
  
  OPC_UA: string[] = ['name', 'dataType', 'elements', 'startAddress', 'endAddress', 'nodeID'];
  MQTT: string[] = ['name', 'dataType', 'elements', 'startAddress', 'endAddress'];

  selectedRow : number = -1;
  dataSource: MatTableDataSource<tagElement>;
  displayedColumns= this.OPC_UA
  
  @ViewChild(MatSort) sort: MatSort;

  constructor(public tagService: ServiceTagService, public buttonService: ButtonSettingsService) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

   
   }
  
  ngOnInit() {
    this.tagService.newTagSubject.subscribe(data => {
      ELEMENT_DATA.push({name: data[0], dataType: data[1], elements: data[2], startAddress: data[3], endAddress: data[4], nodeID: data[5]});
      this.updateData();
    })

    this.tagService.removeTagSubject.subscribe(() =>{
      if(this.selectedRow !=-1){
        ELEMENT_DATA.splice(this.selectedRow,1);
      }
      if(this.selectedRow >=ELEMENT_DATA.length){
        this.selectedRow = -1;
        this.buttonService.setRowSelection(this.selectedRow);
      }
      this.updateData();
    });

    this.tagService.modifiedTagSubject.subscribe(data => {
      ELEMENT_DATA[this.buttonService.getRowSelection()] = {name: data[0], dataType: data[1], elements: data[2], startAddress: data[3], endAddress: data[4], nodeID: data[5]};
      this.tagService.setRowData(ELEMENT_DATA[this.buttonService.getRowSelection()]);
      this.updateData();
    })

    this.tagService.resetTagsSubject.subscribe(()=>{
      ELEMENT_DATA.length = 0;
      this.buttonService.setRowSelection(-1);
      this.tagService.setRowData(null);
      this.updateData();
    })

  }

  updateData(){
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.ngAfterViewInit();
  }
  ngOnDestroy(): void {

    this.tagService.newTagSubject.unsubscribe();
    this.tagService.removeTagSubject.unsubscribe();
    this.tagService.resetTagsSubject.unsubscribe();
    
  }



  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  setClickedRow(index : number){
    if(this.selectedRow == -1){
      this.buttonService.enableButtons();
    }
    this.selectedRow = index;
    this.buttonService.setRowSelection(this.selectedRow);
    let row = ELEMENT_DATA[this.selectedRow];
    this.tagService.setRowData(row);
   
  }

  

}
