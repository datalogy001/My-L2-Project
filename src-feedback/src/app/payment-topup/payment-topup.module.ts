import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentTopupPageRoutingModule } from './payment-topup-routing.module';

import { PaymentTopupPage } from './payment-topup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    PaymentTopupPageRoutingModule
  ],
  declarations: [PaymentTopupPage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentTopupPageModule {}
