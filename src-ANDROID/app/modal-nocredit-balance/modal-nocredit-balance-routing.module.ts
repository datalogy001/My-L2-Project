import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalNocreditBalancePage } from './modal-nocredit-balance.page';

const routes: Routes = [
  {
    path: '',
    component: ModalNocreditBalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalNocreditBalancePageRoutingModule {}
