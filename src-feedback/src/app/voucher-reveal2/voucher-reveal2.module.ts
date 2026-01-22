import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoucherReveal2PageRoutingModule } from './voucher-reveal2-routing.module';

import { VoucherReveal2Page } from './voucher-reveal2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoucherReveal2PageRoutingModule
  ],
  declarations: [VoucherReveal2Page]
})
export class VoucherReveal2PageModule {}
