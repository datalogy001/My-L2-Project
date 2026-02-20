import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessModelEsimPageRoutingModule } from './success-model-esim-routing.module';

import { SuccessModelEsimPage } from './success-model-esim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessModelEsimPageRoutingModule
  ],
  declarations: [SuccessModelEsimPage]
})
export class SuccessModelEsimPageModule {}
