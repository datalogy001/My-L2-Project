import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddCardFpayPageRoutingModule } from './add-card-fpay-routing.module';

import { AddCardFpayPage } from './add-card-fpay.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    AddCardFpayPageRoutingModule
  ],
  declarations: [AddCardFpayPage]
})
export class AddCardFpayPageModule {}
