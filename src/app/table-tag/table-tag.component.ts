import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ServiceTagService } from '../services/service-tag.service';
import { ButtonSettingsService } from '../services/button-settings.service';
import { ConfigurationService } from '../services/data-services/configuration.service';
import { TagElement } from '../models/tag-element';



const ELEMENT_DATA: TagElement[] = [];

@Component({
  selector: 'app-table-tag',
  templateUrl: './table-tag.component.html',
  styleUrls: ['./table-tag.component.css']
})

/// <summary>
///     A component representing the adi table.
/// </summary>
export class TableTagComponent implements OnInit, OnDestroy {

  OPC_UA: string[] = ['name', 'dataType', 'elements', 'direction', 'startAddress', 'endAddress', 'nodeID'];
  MQTT: string[] = ['name', 'dataType', 'elements', 'direction', 'startAddress', 'endAddress'];

  selectedRow: number = -1;
  dataSource: MatTableDataSource<TagElement>;
  displayedColumns = this.OPC_UA;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public tagService: ServiceTagService, public buttonService: ButtonSettingsService, public config: ConfigurationService) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.filter = "";

  }
  ngOnInit() {
    this.tagService.newTagSubject.subscribe(adi => {
      ELEMENT_DATA.push({
        name: adi.getName(), dataType: adi.getDataType().name,
        elements: adi.getElementsNumber(), direction: adi.getDirection(), startAddress: adi.getStartAddress(),
        endAddress: adi.getEndAddress(), nodeID: adi.getOpcUANodeIdentifier()

      });
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.ngAfterViewInit();
      this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
      if (this.selectedRow != -1) {
        this.tagService.setRowData(this.dataSource.data[this.selectedRow]);
      }
    })

    this.tagService.removeTagSubject.subscribe(() => {
      let tagRemove = ELEMENT_DATA[this.selectedRow];
      ELEMENT_DATA.splice(this.selectedRow, 1);
      let adiRemove = this.config.findAdi(tagRemove);
      this.config.removeAdi(adiRemove);

      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.ngAfterViewInit();
      this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);

      if (this.selectedRow >= ELEMENT_DATA.length) {
        this.resetRowData();
      }
      else {
        this.tagService.setRowData(this.dataSource.data[this.selectedRow]);
      }
    });

    this.tagService.modifiedTagSubject.subscribe(adi => {
      ELEMENT_DATA[this.selectedRow] = {
        name: adi.getName(), dataType: adi.getDataType().name,
        elements: adi.getElementsNumber(), direction: adi.getDirection(), startAddress: adi.getStartAddress(),
        endAddress: adi.getEndAddress(), nodeID: adi.getOpcUANodeIdentifier()
      };
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.ngAfterViewInit();
      this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);

      this.tagService.setRowData(this.dataSource.data[this.selectedRow]);
    })

    this.tagService.resetTagsSubject.subscribe(() => {
      ELEMENT_DATA.length = 0;
      this.config.getAdiList().length = 0;
      this.resetRowData();
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.ngAfterViewInit();
    })

    this.tagService.protocolChangeSubject.subscribe(protocol => {
      (protocol === "OPC-UA") ? this.displayedColumns = this.OPC_UA : this.displayedColumns = this.MQTT;
    })

    this.tagService.fileToTableSubject.subscribe(() => {
      for (let adi of this.config.getAdiList()) {
        ELEMENT_DATA.push({
          name: adi.getName(), dataType: adi.getDataType().name,
          elements: adi.getElementsNumber(), direction: adi.getDirection(), startAddress: adi.getStartAddress(),
          endAddress: adi.getEndAddress(), nodeID: adi.getOpcUANodeIdentifier()
        })
      }
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.ngAfterViewInit();
      this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
    })
  }

  ngOnDestroy(): void {

    this.tagService.newTagSubject.unsubscribe();
    this.tagService.removeTagSubject.unsubscribe();
    this.tagService.resetTagsSubject.unsubscribe();
    this.tagService.protocolChangeSubject.unsubscribe();

  }
  /// <summary>
  ///     reset row data
  /// </summary>
  resetRowData() {
    this.selectedRow = -1;
    this.buttonService.setRowSelection(-1);
    this.tagService.setRowData(null);
  }

  /// <summary>
  ///     Updates the sorting of the dataSource.
  /// </summary>
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

  }
  /// <summary>
  ///     Method to sort the clicked header.
  /// </summary>
  sortHeader() {
    this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
    this.tagService.setRowData(this.dataSource.data[this.selectedRow])
  }
  /// <summary>
  ///     Method to filter the table based on the searchbar.
  /// </summary>
  /// <param name="filterValue">The searched text.</param>
  applyFilter(filterValue: string) {
    if (this.selectedRow > -1) {
      this.resetRowData();
      this.buttonService.disableButtons();
    }
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  /// <summary>
  ///     A method that is triggered when a row is clicked in the table.
  /// </summary>
  /// <param name="index">The index row clicked.</param>
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
