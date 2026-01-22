import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCardFpayPage } from './add-card-fpay.page';

const routes: Routes = [
  {
    path: '',
    component: AddCardFpayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCardFpayPageRoutingModule {}
