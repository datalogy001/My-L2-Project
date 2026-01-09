import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveBundleDetailPageRoutingModule } from './active-bundle-detail-routing.module';

import { ActiveBundleDetailPage } from './active-bundle-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveBundleDetailPageRoutingModule
  ],
  declarations: [ActiveBundleDetailPage]
})
export class ActiveBundleDetailPageModule {}
