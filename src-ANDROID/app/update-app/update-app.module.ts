import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateAppPageRoutingModule } from './update-app-routing.module';

import { UpdateAppPage } from './update-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    UpdateAppPageRoutingModule
  ],
  declarations: [UpdateAppPage]
})
export class UpdateAppPageModule {}
