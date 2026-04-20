import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalLanguagechangePageRoutingModule } from './modal-languagechange-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModalLanguagechangePage } from './modal-languagechange.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    ModalLanguagechangePageRoutingModule
  ],
  declarations: [ModalLanguagechangePage]
})
export class ModalLanguagechangePageModule {}
