import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountCreatedPageRoutingModule } from './account-created-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AccountCreatedPage } from './account-created.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    AccountCreatedPageRoutingModule
  ],
  declarations: [AccountCreatedPage]
})
export class AccountCreatedPageModule {}
