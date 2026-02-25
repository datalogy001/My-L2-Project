import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryCodeModelPage } from './country-code-model.page';

const routes: Routes = [
  {
    path: '',
    component: CountryCodeModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryCodeModelPageRoutingModule {}
