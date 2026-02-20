import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddPaymentCardPageRoutingModule } from './add-payment-card-routing.module';

import { AddPaymentCardPage } from './add-payment-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddPaymentCardPageRoutingModule
  ],
  declarations: [AddPaymentCardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddPaymentCardPageModule {}
