import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppleModelPageRoutingModule } from './apple-model-routing.module';

import { AppleModelPage } from './apple-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppleModelPageRoutingModule
  ],
  declarations: [AppleModelPage]
})
export class AppleModelPageModule {}
