import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherRevealPage } from './voucher-reveal.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherRevealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherRevealPageRoutingModule {}
