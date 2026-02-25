import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupSocialreferPageRoutingModule } from './signup-socialrefer-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SignupSocialreferPage } from './signup-socialrefer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    SignupSocialreferPageRoutingModule
  ],
  declarations: [SignupSocialreferPage]
})
export class SignupSocialreferPageModule {}
