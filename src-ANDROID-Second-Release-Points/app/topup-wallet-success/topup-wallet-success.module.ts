import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TopupWalletSuccessPageRoutingModule } from './topup-wallet-success-routing.module';

import { TopupWalletSuccessPage } from './topup-wallet-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    TopupWalletSuccessPageRoutingModule
  ],
  declarations: [TopupWalletSuccessPage]
})
export class TopupWalletSuccessPageModule {}
