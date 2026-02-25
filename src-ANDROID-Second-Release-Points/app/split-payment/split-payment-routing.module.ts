import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplitPaymentPage } from './split-payment.page';

const routes: Routes = [
  {
    path: '',
    component: SplitPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitPaymentPageRoutingModule {}
