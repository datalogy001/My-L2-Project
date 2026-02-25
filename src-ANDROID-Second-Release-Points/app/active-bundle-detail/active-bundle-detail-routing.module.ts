import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveBundleDetailPage } from './active-bundle-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveBundleDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveBundleDetailPageRoutingModule {}
