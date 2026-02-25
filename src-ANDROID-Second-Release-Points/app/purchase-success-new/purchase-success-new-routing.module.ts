import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseSuccessNewPage } from './purchase-success-new.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseSuccessNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseSuccessNewPageRoutingModule {}
