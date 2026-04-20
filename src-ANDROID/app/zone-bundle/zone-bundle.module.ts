import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZoneBundlePageRoutingModule } from './zone-bundle-routing.module';

import { ZoneBundlePage } from './zone-bundle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZoneBundlePageRoutingModule
  ],
  declarations: [ZoneBundlePage]
})
export class ZoneBundlePageModule {}
