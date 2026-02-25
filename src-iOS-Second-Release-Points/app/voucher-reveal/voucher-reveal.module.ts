import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoucherRevealPageRoutingModule } from './voucher-reveal-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { VoucherRevealPage } from './voucher-reveal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    
    VoucherRevealPageRoutingModule
  ],
  declarations: [VoucherRevealPage]
})
export class VoucherRevealPageModule {}
