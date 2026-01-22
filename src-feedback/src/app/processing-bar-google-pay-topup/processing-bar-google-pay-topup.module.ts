import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingBarGooglePayTopupPageRoutingModule } from './processing-bar-google-pay-topup-routing.module';

import { ProcessingBarGooglePayTopupPage } from './processing-bar-google-pay-topup.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProcessingBarGooglePayTopupPageRoutingModule
  ],
  declarations: [ProcessingBarGooglePayTopupPage]
})
export class ProcessingBarGooglePayTopupPageModule {}
