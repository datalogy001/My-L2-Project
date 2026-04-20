import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutVerifcationPage } from './checkout-verifcation.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutVerifcationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutVerifcationPageRoutingModule {}
