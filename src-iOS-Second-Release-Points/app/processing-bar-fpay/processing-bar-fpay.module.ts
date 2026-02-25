import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingBarFpayPageRoutingModule } from './processing-bar-fpay-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProcessingBarFpayPage } from './processing-bar-fpay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    ProcessingBarFpayPageRoutingModule
  ],
  declarations: [ProcessingBarFpayPage]
})
export class ProcessingBarFpayPageModule {}
