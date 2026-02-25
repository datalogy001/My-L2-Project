import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentDaysPageRoutingModule } from './payment-days-routing.module';

import { PaymentDaysPage } from './payment-days.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    PaymentDaysPageRoutingModule
  ],
  declarations: [PaymentDaysPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentDaysPageModule {}
