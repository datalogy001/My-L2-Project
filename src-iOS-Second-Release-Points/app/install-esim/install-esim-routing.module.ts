import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstallEsimPage } from './install-esim.page';

const routes: Routes = [
  {
    path: '',
    component: InstallEsimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstallEsimPageRoutingModule {}
