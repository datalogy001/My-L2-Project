import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetYourBundlePage } from './get-your-bundle.page';

const routes: Routes = [
  {
    path: '',
    component: GetYourBundlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetYourBundlePageRoutingModule {}
