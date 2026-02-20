import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BundleDataTopupPageRoutingModule } from './bundle-data-topup-routing.module';

import { BundleDataTopupPage } from './bundle-data-topup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    BundleDataTopupPageRoutingModule
  ],
  declarations: [BundleDataTopupPage]
})
export class BundleDataTopupPageModule {}
