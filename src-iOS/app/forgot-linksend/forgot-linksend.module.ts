import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotLinksendPageRoutingModule } from './forgot-linksend-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ForgotLinksendPage } from './forgot-linksend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    ForgotLinksendPageRoutingModule
  ],
  declarations: [ForgotLinksendPage]
})
export class ForgotLinksendPageModule {}
