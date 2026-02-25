import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupWalletSuccessPage } from './topup-wallet-success.page';

const routes: Routes = [
  {
    path: '',
    component: TopupWalletSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupWalletSuccessPageRoutingModule {}
