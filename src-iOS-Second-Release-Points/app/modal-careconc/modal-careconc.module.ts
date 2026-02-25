import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCareconcPageRoutingModule } from './modal-careconc-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { ModalCareconcPage } from './modal-careconc.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    ModalCareconcPageRoutingModule
  ],
  declarations: [ModalCareconcPage]
})
export class ModalCareconcPageModule {}
