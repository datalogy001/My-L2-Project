import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchCountryZonePageRoutingModule } from './search-country-zone-routing.module';

import { SearchCountryZonePage } from './search-country-zone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchCountryZonePageRoutingModule
  ],
  declarations: [SearchCountryZonePage]
})
export class SearchCountryZonePageModule {}
