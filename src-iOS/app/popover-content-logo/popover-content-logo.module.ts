import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverContentLogoPageRoutingModule } from './popover-content-logo-routing.module';

import { PopoverContentLogoPage } from './popover-content-logo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverContentLogoPageRoutingModule
  ],
  declarations: [PopoverContentLogoPage]
})
export class PopoverContentLogoPageModule {}
