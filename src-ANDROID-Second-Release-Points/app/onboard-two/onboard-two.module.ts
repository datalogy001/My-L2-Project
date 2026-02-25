import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardTwoPageRoutingModule } from './onboard-two-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { OnboardTwoPage } from './onboard-two.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    OnboardTwoPageRoutingModule
  ],
  declarations: [OnboardTwoPage]
})
export class OnboardTwoPageModule {}
