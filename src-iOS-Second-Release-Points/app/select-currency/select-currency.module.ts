import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SelectCurrencyPageRoutingModule } from './select-currency-routing.module';

import { SelectCurrencyPage } from './select-currency.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    SelectCurrencyPageRoutingModule
  ],
  declarations: [SelectCurrencyPage]
})
export class SelectCurrencyPageModule {}
