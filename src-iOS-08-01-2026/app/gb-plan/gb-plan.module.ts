import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GbPlanPageRoutingModule } from './gb-plan-routing.module';

import { GbPlanPage } from './gb-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GbPlanPageRoutingModule
  ],
  declarations: [GbPlanPage]
})
export class GbPlanPageModule {}
