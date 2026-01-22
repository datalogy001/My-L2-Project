import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherReveal2Page } from './voucher-reveal2.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherReveal2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherReveal2PageRoutingModule {}
