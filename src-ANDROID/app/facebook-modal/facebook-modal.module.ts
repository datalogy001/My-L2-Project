import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacebookModalPageRoutingModule } from './facebook-modal-routing.module';
import { TranslateModule } from '@ngx-translate/core'
import { FacebookModalPage } from './facebook-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    FacebookModalPageRoutingModule
  ],
  declarations: [FacebookModalPage]
})
export class FacebookModalPageModule {}
