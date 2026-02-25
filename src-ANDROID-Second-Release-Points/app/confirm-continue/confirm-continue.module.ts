import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ConfirmContinuePageRoutingModule } from './confirm-continue-routing.module';

import { ConfirmContinuePage } from './confirm-continue.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    ConfirmContinuePageRoutingModule
  ],
  declarations: [ConfirmContinuePage]
})
export class ConfirmContinuePageModule {}
