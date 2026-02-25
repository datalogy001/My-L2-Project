import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompatibleDevicePage } from './compatible-device.page';

const routes: Routes = [
  {
    path: '',
    component: CompatibleDevicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompatibleDevicePageRoutingModule {}
