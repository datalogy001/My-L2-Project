import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core'
import { DelModelCoupenPageRoutingModule } from './del-model-coupen-routing.module';

import { DelModelCoupenPage } from './del-model-coupen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DelModelCoupenPageRoutingModule
  ],
  declarations: [DelModelCoupenPage]
})
export class DelModelCoupenPageModule {}
