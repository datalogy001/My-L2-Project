import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatedSuccessfulPageRoutingModule } from './created-successful-routing.module';

import { CreatedSuccessfulPage } from './created-successful.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatedSuccessfulPageRoutingModule
  ],
  declarations: [CreatedSuccessfulPage]
})
export class CreatedSuccessfulPageModule {}
