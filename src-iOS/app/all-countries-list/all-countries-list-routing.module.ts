import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCountriesListPage } from './all-countries-list.page';

const routes: Routes = [
  {
    path: '',
    component: AllCountriesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCountriesListPageRoutingModule {}
