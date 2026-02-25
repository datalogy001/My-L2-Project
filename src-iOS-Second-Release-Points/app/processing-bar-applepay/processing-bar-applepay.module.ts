import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingBarApplepayPageRoutingModule } from './processing-bar-applepay-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProcessingBarApplepayPage } from './processing-bar-applepay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    ProcessingBarApplepayPageRoutingModule
  ],
  declarations: [ProcessingBarApplepayPage]
})
export class ProcessingBarApplepayPageModule {}
