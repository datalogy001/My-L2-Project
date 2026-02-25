import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordErrorPageRoutingModule } from './password-error-routing.module';

import { PasswordErrorPage } from './password-error.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordErrorPageRoutingModule
  ],
  declarations: [PasswordErrorPage]
})
export class PasswordErrorPageModule {}
