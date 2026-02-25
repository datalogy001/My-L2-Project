import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDetailPageRoutingModule } from './payment-detail-routing.module';
import { PaymentDetailPage } from './payment-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentDetailPageRoutingModule,
  ],
  declarations: [PaymentDetailPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentDetailPageModule {}
