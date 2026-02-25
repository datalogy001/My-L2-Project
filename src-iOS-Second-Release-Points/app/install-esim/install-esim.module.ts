import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstallEsimPageRoutingModule } from './install-esim-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { InstallEsimPage } from './install-esim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    InstallEsimPageRoutingModule
  ],
  declarations: [InstallEsimPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class InstallEsimPageModule {}
