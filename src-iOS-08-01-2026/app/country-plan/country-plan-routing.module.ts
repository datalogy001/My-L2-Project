import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryPlanPage } from './country-plan.page';

const routes: Routes = [
  {
    path: '',
    component: CountryPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryPlanPageRoutingModule {}
