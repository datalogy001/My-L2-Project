import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocailLoginCountryPhonePageRoutingModule } from './socail-login-country-phone-routing.module';

import { SocailLoginCountryPhonePage } from './socail-login-country-phone.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SocailLoginCountryPhonePageRoutingModule
  ],
  declarations: [SocailLoginCountryPhonePage]
})
export class SocailLoginCountryPhonePageModule {}
