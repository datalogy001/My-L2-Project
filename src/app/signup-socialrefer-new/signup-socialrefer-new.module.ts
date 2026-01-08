import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupSocialreferNewPageRoutingModule } from './signup-socialrefer-new-routing.module';

import { SignupSocialreferNewPage } from './signup-socialrefer-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupSocialreferNewPageRoutingModule
  ],
  declarations: [SignupSocialreferNewPage]
})
export class SignupSocialreferNewPageModule {}
