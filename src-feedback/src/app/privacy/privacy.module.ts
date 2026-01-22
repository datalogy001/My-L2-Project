import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyPageRoutingModule } from './privacy-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PrivacyPage } from './privacy.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    PrivacyPageRoutingModule
  ],
  declarations: [PrivacyPage]
})
export class PrivacyPageModule {}
