import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourPlanPageRoutingModule } from './your-plan-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { YourPlanPage } from './your-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    YourPlanPageRoutingModule
  ],
  declarations: [YourPlanPage]
})
export class YourPlanPageModule {}
