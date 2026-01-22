import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefercodeAddedPageRoutingModule } from './refercode-added-routing.module';

import { RefercodeAddedPage } from './refercode-added.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefercodeAddedPageRoutingModule
  ],
  declarations: [RefercodeAddedPage]
})
export class RefercodeAddedPageModule {}
