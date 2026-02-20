import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularListingPageRoutingModule } from './popular-listing-routing.module';

import { PopularListingPage } from './popular-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularListingPageRoutingModule
  ],
  declarations: [PopularListingPage]
})
export class PopularListingPageModule {}
