import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseSuccessPageRoutingModule } from './purchase-success-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PurchaseSuccessPage } from './purchase-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    PurchaseSuccessPageRoutingModule
  ],
  declarations: [PurchaseSuccessPage]
})
export class PurchaseSuccessPageModule {}
