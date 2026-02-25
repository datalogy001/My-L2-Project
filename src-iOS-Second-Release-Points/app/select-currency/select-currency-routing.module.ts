import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectCurrencyPage } from './select-currency.page';

const routes: Routes = [
  {
    path: '',
    component: SelectCurrencyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectCurrencyPageRoutingModule {}
