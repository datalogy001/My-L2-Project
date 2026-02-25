import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BundleSummaryPageRoutingModule } from './bundle-summary-routing.module';

import { BundleSummaryPage } from './bundle-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BundleSummaryPageRoutingModule
  ],
  declarations: [BundleSummaryPage]
})
export class BundleSummaryPageModule {}
