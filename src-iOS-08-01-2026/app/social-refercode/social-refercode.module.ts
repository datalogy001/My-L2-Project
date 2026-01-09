import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialRefercodePageRoutingModule } from './social-refercode-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SocialRefercodePage } from './social-refercode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SocialRefercodePageRoutingModule
  ],
  declarations: [SocialRefercodePage]
})
export class SocialRefercodePageModule {}
