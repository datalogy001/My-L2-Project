import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryPlanPageRoutingModule } from './country-plan-routing.module';

import { CountryPlanPage } from './country-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountryPlanPageRoutingModule
  ],
  declarations: [CountryPlanPage]
})
export class CountryPlanPageModule {}
