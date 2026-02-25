import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingScreenAppPageRoutingModule } from './loading-screen-app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingScreenAppPage } from './loading-screen-app.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    LoadingScreenAppPageRoutingModule
  ],
  declarations: [LoadingScreenAppPage]
})
export class LoadingScreenAppPageModule {}
