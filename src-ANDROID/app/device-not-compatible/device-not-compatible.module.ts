import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceNotCompatiblePageRoutingModule } from './device-not-compatible-routing.module';

import { DeviceNotCompatiblePage } from './device-not-compatible.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceNotCompatiblePageRoutingModule
  ],
  declarations: [DeviceNotCompatiblePage]
})
export class DeviceNotCompatiblePageModule {}
