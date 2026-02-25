import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingBarApplePayTopupPageRoutingModule } from './processing-bar-apple-pay-topup-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProcessingBarApplePayTopupPage } from './processing-bar-apple-pay-topup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    ProcessingBarApplePayTopupPageRoutingModule
  ],
  declarations: [ProcessingBarApplePayTopupPage]
})
export class ProcessingBarApplePayTopupPageModule {}
