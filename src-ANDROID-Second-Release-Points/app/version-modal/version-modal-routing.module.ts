import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VersionMOdalPage } from './version-modal.page';

const routes: Routes = [
  {
    path: '',
    component: VersionMOdalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VersionMOdalPageRoutingModule {}
