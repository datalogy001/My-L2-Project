import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadEsimPageRoutingModule } from './download-esim-routing.module';

import { DownloadEsimPage } from './download-esim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadEsimPageRoutingModule
  ],
  declarations: [DownloadEsimPage]
})
export class DownloadEsimPageModule {}
