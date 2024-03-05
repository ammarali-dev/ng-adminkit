import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { TableComponent } from './table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, TableComponent, WorldMapComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [TableComponent],
})
export class AppModule {}
