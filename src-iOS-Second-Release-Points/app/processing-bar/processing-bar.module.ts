import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingBarPageRoutingModule } from './processing-bar-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProcessingBarPage } from './processing-bar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    ProcessingBarPageRoutingModule
  ],
  declarations: [ProcessingBarPage]
})
export class ProcessingBarPageModule {}
