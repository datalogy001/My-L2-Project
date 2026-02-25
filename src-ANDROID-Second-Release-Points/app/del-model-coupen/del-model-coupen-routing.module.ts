import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DelModelCoupenPage } from './del-model-coupen.page';

const routes: Routes = [
  {
    path: '',
    component: DelModelCoupenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DelModelCoupenPageRoutingModule {}
