import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPromptPageRoutingModule } from './login-prompt-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoginPromptPage } from './login-prompt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    LoginPromptPageRoutingModule
  ],
  declarations: [LoginPromptPage]
})
export class LoginPromptPageModule {}
