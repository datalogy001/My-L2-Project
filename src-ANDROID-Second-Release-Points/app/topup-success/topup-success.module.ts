import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupSuccessPageRoutingModule } from './topup-success-routing.module';

import { TopupSuccessPage } from './topup-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopupSuccessPageRoutingModule
  ],
  declarations: [TopupSuccessPage]
})
export class TopupSuccessPageModule {}
