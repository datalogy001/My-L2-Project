import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditTopupNewPage } from './credit-topup-new.page';

const routes: Routes = [
  {
    path: '',
    component: CreditTopupNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditTopupNewPageRoutingModule {}
