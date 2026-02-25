import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingBarAppCreaditPageRoutingModule } from './processing-bar-app-creadit-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProcessingBarAppCreaditPage } from './processing-bar-app-creadit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProcessingBarAppCreaditPageRoutingModule
  ],
  declarations: [ProcessingBarAppCreaditPage]
})
export class ProcessingBarAppCreaditPageModule {}
