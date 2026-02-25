import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardPageRoutingModule } from './onboard-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { OnboardPage } from './onboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    OnboardPageRoutingModule
  ],
  declarations: [OnboardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OnboardPageModule {}
