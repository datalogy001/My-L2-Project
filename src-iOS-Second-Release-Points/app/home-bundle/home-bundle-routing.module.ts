import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeBundlePage } from './home-bundle.page';

const routes: Routes = [
  {
    path: '',
    component: HomeBundlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeBundlePageRoutingModule {}
