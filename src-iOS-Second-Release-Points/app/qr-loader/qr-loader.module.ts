import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrLoaderPageRoutingModule } from './qr-loader-routing.module';

import { QrLoaderPage } from './qr-loader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrLoaderPageRoutingModule
  ],
  declarations: [QrLoaderPage]
})
export class QrLoaderPageModule {}
