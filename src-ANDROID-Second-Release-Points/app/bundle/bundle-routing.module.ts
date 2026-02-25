import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BundlePage } from './bundle.page';

const routes: Routes = [
  {
    path: '',
    component: BundlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundlePageRoutingModule {}
