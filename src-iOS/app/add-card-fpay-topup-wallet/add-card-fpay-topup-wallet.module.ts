import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddCardFpayTopupWalletPageRoutingModule } from './add-card-fpay-topup-wallet-routing.module';

import { AddCardFpayTopupWalletPage } from './add-card-fpay-topup-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddCardFpayTopupWalletPageRoutingModule
  ],
  declarations: [AddCardFpayTopupWalletPage]
})
export class AddCardFpayTopupWalletPageModule {}
