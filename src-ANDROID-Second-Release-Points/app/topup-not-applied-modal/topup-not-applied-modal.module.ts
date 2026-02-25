import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupNotAppliedModalPageRoutingModule } from './topup-not-applied-modal-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { TopupNotAppliedModalPage } from './topup-not-applied-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    TopupNotAppliedModalPageRoutingModule
  ],
  declarations: [TopupNotAppliedModalPage]
})
export class TopupNotAppliedModalPageModule {}
