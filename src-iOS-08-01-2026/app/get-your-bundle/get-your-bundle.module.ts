import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetYourBundlePageRoutingModule } from './get-your-bundle-routing.module';

import { GetYourBundlePage } from './get-your-bundle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetYourBundlePageRoutingModule
  ],
  declarations: [GetYourBundlePage]
})
export class GetYourBundlePageModule {}
