import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationResetPageRoutingModule } from './verification-reset-routing.module';

import { VerificationResetPage } from './verification-reset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationResetPageRoutingModule
  ],
  declarations: [VerificationResetPage]
})
export class VerificationResetPageModule {}
