import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutVerifcationPageRoutingModule } from './checkout-verifcation-routing.module';

import { CheckoutVerifcationPage } from './checkout-verifcation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutVerifcationPageRoutingModule
  ],
  declarations: [CheckoutVerifcationPage]
})
export class CheckoutVerifcationPageModule {}
