import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DelAccountPageRoutingModule } from './del-account-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { DelAccountPage } from './del-account.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    DelAccountPageRoutingModule
  ],
  declarations: [DelAccountPage]
})
export class DelAccountPageModule {}
