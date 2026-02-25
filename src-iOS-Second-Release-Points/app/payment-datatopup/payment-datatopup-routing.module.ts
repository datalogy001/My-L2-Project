import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentDatatopupPage } from './payment-datatopup.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentDatatopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentDatatopupPageRoutingModule {}
