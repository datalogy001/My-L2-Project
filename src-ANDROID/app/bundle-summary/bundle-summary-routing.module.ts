import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BundleSummaryPage } from './bundle-summary.page';

const routes: Routes = [
  {
    path: '',
    component: BundleSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundleSummaryPageRoutingModule {}
