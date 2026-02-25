import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCodenotworkPageRoutingModule } from './modal-codenotwork-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModalCodenotworkPage } from './modal-codenotwork.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    ModalCodenotworkPageRoutingModule
  ],
  declarations: [ModalCodenotworkPage]
})
export class ModalCodenotworkPageModule {}
