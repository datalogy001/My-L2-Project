import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharenowPageRoutingModule } from './sharenow-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharenowPage } from './sharenow.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    SharenowPageRoutingModule
  ],
  declarations: [SharenowPage]
})
export class SharenowPageModule {}
