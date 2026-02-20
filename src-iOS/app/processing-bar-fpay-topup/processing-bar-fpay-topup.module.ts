import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingBarFpayTopupPageRoutingModule } from './processing-bar-fpay-topup-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProcessingBarFpayTopupPage } from './processing-bar-fpay-topup.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    ProcessingBarFpayTopupPageRoutingModule
  ],
  declarations: [ProcessingBarFpayTopupPage]
})
export class ProcessingBarFpayTopupPageModule {}
