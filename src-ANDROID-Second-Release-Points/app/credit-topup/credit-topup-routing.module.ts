import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditTopupPage } from './credit-topup.page';

const routes: Routes = [
  {
    path: '',
    component: CreditTopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditTopupPageRoutingModule {}
