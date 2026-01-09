import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseSuccessNewPageRoutingModule } from './purchase-success-new-routing.module';

import { PurchaseSuccessNewPage } from './purchase-success-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseSuccessNewPageRoutingModule
  ],
  declarations: [PurchaseSuccessNewPage]
})
export class PurchaseSuccessNewPageModule {}
