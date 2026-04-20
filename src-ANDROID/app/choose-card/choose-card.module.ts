import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseCardPageRoutingModule } from './choose-card-routing.module';

import { ChooseCardPage } from './choose-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseCardPageRoutingModule
  ],
  declarations: [ChooseCardPage]
})
export class ChooseCardPageModule {}
