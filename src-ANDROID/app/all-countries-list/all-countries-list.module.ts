import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCountriesListPageRoutingModule } from './all-countries-list-routing.module';

import { AllCountriesListPage } from './all-countries-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCountriesListPageRoutingModule
  ],
  declarations: [AllCountriesListPage]
})
export class AllCountriesListPageModule {}
