import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourPlanPage } from './your-plan.page';

const routes: Routes = [
  {
    path: '',
    component: YourPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourPlanPageRoutingModule {}
