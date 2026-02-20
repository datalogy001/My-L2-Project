import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstallationPageRoutingModule } from './installation-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { InstallationPage } from './installation.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    InstallationPageRoutingModule
  ],
  declarations: [InstallationPage]
})
export class InstallationPageModule {}
