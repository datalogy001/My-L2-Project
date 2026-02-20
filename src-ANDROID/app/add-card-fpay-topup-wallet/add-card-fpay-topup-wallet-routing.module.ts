import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCardFpayTopupWalletPage } from './add-card-fpay-topup-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: AddCardFpayTopupWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCardFpayTopupWalletPageRoutingModule {}
