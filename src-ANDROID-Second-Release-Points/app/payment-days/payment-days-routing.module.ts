import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentDaysPage } from './payment-days.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentDaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentDaysPageRoutingModule {}
