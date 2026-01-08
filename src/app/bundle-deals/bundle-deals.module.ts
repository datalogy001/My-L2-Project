import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BundleDealsPageRoutingModule } from './bundle-deals-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { BundleDealsPage } from './bundle-deals.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    BundleDealsPageRoutingModule
  ],
  declarations: [BundleDealsPage]
})
export class BundleDealsPageModule {}
