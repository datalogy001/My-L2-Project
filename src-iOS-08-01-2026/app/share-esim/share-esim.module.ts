import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareEsimPageRoutingModule } from './share-esim-routing.module';

import { ShareEsimPage } from './share-esim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareEsimPageRoutingModule
  ],
  declarations: [ShareEsimPage]
})
export class ShareEsimPageModule {}
