import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditTopupNewPageRoutingModule } from './credit-topup-new-routing.module';

import { CreditTopupNewPage } from './credit-topup-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditTopupNewPageRoutingModule
  ],
  declarations: [CreditTopupNewPage]
})
export class CreditTopupNewPageModule {}
