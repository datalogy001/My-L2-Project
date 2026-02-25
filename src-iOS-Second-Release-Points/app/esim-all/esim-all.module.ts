import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EsimAllPageRoutingModule } from './esim-all-routing.module';

import { EsimAllPage } from './esim-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsimAllPageRoutingModule
  ],
  declarations: [EsimAllPage]
})
export class EsimAllPageModule {}
