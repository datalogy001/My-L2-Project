import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherTopupPage } from './voucher-topup.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherTopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherTopupPageRoutingModule {}
