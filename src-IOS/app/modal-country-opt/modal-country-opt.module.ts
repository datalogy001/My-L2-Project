import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core'
import { ModalCountryOptPageRoutingModule } from './modal-country-opt-routing.module';

import { ModalCountryOptPage } from './modal-country-opt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ModalCountryOptPageRoutingModule
  ],
  declarations: [ModalCountryOptPage]
})
export class ModalCountryOptPageModule {}
