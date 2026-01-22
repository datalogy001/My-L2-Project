import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { VoucherTopupPageRoutingModule } from './voucher-topup-routing.module';

import { VoucherTopupPage } from './voucher-topup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    VoucherTopupPageRoutingModule
  ],
  declarations: [VoucherTopupPage]
})
export class VoucherTopupPageModule {}
