import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ChooseCountryPageRoutingModule } from './choose-country-routing.module';

import { ChooseCountryPage } from './choose-country.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    ChooseCountryPageRoutingModule
  ],
  declarations: [ChooseCountryPage]
})
export class ChooseCountryPageModule {}
