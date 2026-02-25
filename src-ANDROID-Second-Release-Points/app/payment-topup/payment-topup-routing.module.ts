import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentTopupPage } from './payment-topup.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentTopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentTopupPageRoutingModule {}
