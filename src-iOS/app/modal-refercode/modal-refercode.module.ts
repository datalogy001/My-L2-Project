import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ModalRefercodePageRoutingModule } from './modal-refercode-routing.module';

import { ModalRefercodePage } from './modal-refercode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    ModalRefercodePageRoutingModule
  ],
  declarations: [ModalRefercodePage]
})
export class ModalRefercodePageModule {}
