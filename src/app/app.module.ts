import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import 'hammerjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

import {
  MatMenuModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatRadioModule,
  MatIconModule,
  MatDividerModule,
  MatTableModule,
  MatSortModule,
  } from '@angular/material';
import { DialogTagComponent } from './dialog-tag/dialog-tag.component';
import { DisplayComponent } from './display/display.component';
import { TableTagComponent } from './table-tag/table-tag.component';
import { ServiceTagService } from './services/service-tag.service';
import { ButtonSettingsService } from './services/button-settings.service';
import { ConfigurationXmlService } from './services/data-services/configuration-xml.service';
import { ConfigurationService } from './services/data-services/configuration.service';
import { DatePipe } from '@angular/common';
import { ConfigurationReaderService } from './services/data-services/configuration-reader.service';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DialogTagComponent,
    DisplayComponent,
    TableTagComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    
  ],
  entryComponents: [DialogTagComponent],
  providers: [
    ServiceTagService,ButtonSettingsService,ConfigurationXmlService,
    ConfigurationService,DatePipe, ConfigurationReaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
