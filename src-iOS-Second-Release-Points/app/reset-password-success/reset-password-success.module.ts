import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordSuccessPageRoutingModule } from './reset-password-success-routing.module';

import { ResetPasswordSuccessPage } from './reset-password-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordSuccessPageRoutingModule
  ],
  declarations: [ResetPasswordSuccessPage]
})
export class ResetPasswordSuccessPageModule {}
