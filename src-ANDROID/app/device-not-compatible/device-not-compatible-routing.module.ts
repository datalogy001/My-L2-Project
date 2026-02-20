import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceNotCompatiblePage } from './device-not-compatible.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceNotCompatiblePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceNotCompatiblePageRoutingModule {}
