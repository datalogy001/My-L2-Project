import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseCountryPage } from './choose-country.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseCountryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseCountryPageRoutingModule {}
