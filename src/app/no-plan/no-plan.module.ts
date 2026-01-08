import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoPlanPageRoutingModule } from './no-plan-routing.module';

import { NoPlanPage } from './no-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoPlanPageRoutingModule
  ],
  declarations: [NoPlanPage]
})
export class NoPlanPageModule {}
