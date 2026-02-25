import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingBarGooglePayPageRoutingModule } from './processing-bar-google-pay-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProcessingBarGooglePayPage } from './processing-bar-google-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProcessingBarGooglePayPageRoutingModule
  ],
  declarations: [ProcessingBarGooglePayPage]
})
export class ProcessingBarGooglePayPageModule {}
