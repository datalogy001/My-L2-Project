import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SplitPaymentPageRoutingModule } from './split-payment-routing.module';

import { SplitPaymentPage } from './split-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SplitPaymentPageRoutingModule
  ],
  declarations: [SplitPaymentPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SplitPaymentPageModule {}
