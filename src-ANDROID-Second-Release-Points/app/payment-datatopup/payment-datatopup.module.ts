import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDatatopupPageRoutingModule } from './payment-datatopup-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentDatatopupPage } from './payment-datatopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    PaymentDatatopupPageRoutingModule
  ],
  declarations: [PaymentDatatopupPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentDatatopupPageModule {}
