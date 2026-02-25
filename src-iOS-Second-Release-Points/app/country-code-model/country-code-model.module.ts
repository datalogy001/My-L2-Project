import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CountryCodeModelPageRoutingModule } from './country-code-model-routing.module';

import { CountryCodeModelPage } from './country-code-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CountryCodeModelPageRoutingModule
  ],
  declarations: [CountryCodeModelPage]
})
export class CountryCodeModelPageModule {}
