import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { StartPageRoutingModule } from './start-routing.module';

import { StartPage } from './start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    StartPageRoutingModule
  ],
  declarations: [StartPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartPageModule {}
