import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingBarTlyncTopUpPayPageRoutingModule } from './processing-bar-tlync-top-up-pay-routing.module';

import { ProcessingBarTlyncTopUpPayPage } from './processing-bar-tlync-top-up-pay.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProcessingBarTlyncTopUpPayPageRoutingModule
  ],
  declarations: [ProcessingBarTlyncTopUpPayPage]
})
export class ProcessingBarTlyncTopUpPayPageModule {}
