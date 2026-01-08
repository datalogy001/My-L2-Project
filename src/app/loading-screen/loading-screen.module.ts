import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeBundlePageRoutingModule } from './home-bundle-routing.module';

import { HomeBundlePage } from './home-bundle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeBundlePageRoutingModule
  ],
  declarations: [HomeBundlePage]
})
export class HomeBundlePageModule {}
