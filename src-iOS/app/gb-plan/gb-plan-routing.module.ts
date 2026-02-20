import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GbPlanPage } from './gb-plan.page';

const routes: Routes = [
  {
    path: '',
    component: GbPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GbPlanPageRoutingModule {}
