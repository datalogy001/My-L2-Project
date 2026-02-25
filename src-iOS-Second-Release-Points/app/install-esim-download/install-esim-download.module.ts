import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { InstallEsimDownloadPageRoutingModule } from './install-esim-download-routing.module';

import { InstallEsimDownloadPage } from './install-esim-download.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    InstallEsimDownloadPageRoutingModule
  ],
  declarations: [InstallEsimDownloadPage]
})
export class InstallEsimDownloadPageModule {}
