import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanCountryPage } from './plan-country.page';

const routes: Routes = [
  {
    path: '',
    component: PlanCountryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanCountryPageRoutingModule {}
