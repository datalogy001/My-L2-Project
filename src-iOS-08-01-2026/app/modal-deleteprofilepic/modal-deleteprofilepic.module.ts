import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core'
import { ModalDeleteprofilepicPageRoutingModule } from './modal-deleteprofilepic-routing.module';

import { ModalDeleteprofilepicPage } from './modal-deleteprofilepic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ModalDeleteprofilepicPageRoutingModule
  ],
  declarations: [ModalDeleteprofilepicPage]
})
export class ModalDeleteprofilepicPageModule {}
