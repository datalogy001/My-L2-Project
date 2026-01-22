import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BundlePageRoutingModule } from './bundle-routing.module';

import { BundlePage } from './bundle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    BundlePageRoutingModule
  ],
  declarations: [BundlePage]
})
export class BundlePageModule {}
