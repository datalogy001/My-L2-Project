import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { PlanCountryPageRoutingModule } from './plan-country-routing.module';

import { PlanCountryPage } from './plan-country.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    PlanCountryPageRoutingModule
  ],
  declarations: [PlanCountryPage]
})
export class PlanCountryPageModule {}
