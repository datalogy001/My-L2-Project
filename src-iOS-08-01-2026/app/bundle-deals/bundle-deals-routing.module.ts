import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BundleDealsPage } from './bundle-deals.page';

const routes: Routes = [
  {
    path: '',
    component: BundleDealsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundleDealsPageRoutingModule {}
