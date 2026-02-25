import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZoneBundlePage } from './zone-bundle.page';

const routes: Routes = [
  {
    path: '',
    component: ZoneBundlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoneBundlePageRoutingModule {}
