import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CreditTopupPageRoutingModule } from './credit-topup-routing.module';

import { CreditTopupPage } from './credit-topup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    CreditTopupPageRoutingModule
  ],
  declarations: [CreditTopupPage]
})
export class CreditTopupPageModule {}
