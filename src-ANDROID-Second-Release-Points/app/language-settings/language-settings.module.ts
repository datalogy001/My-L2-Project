import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanguageSettingsPageRoutingModule } from './language-settings-routing.module';

import { LanguageSettingsPage } from './language-settings.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule, 
    LanguageSettingsPageRoutingModule
  ],
  declarations: [LanguageSettingsPage]
})
export class LanguageSettingsPageModule {}
