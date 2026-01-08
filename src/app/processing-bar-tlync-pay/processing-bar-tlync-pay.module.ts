import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingBarTlyncPayPageRoutingModule } from './processing-bar-tlync-pay-routing.module';

import { ProcessingBarTlyncPayPage } from './processing-bar-tlync-pay.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProcessingBarTlyncPayPageRoutingModule
  ],
  declarations: [ProcessingBarTlyncPayPage]
})
export class ProcessingBarTlyncPayPageModule {}
