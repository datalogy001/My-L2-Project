import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCouponaddedPageRoutingModule } from './modal-couponadded-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModalCouponaddedPage } from './modal-couponadded.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ModalCouponaddedPageRoutingModule
  ],
  declarations: [ModalCouponaddedPage]
})
export class ModalCouponaddedPageModule {}
