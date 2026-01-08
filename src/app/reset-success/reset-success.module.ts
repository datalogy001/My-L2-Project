import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetSuccessPageRoutingModule } from './reset-success-routing.module';

import { ResetSuccessPage } from './reset-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetSuccessPageRoutingModule
  ],
  declarations: [ResetSuccessPage]
})
export class ResetSuccessPageModule {}
