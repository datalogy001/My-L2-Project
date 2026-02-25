import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCouponaddedPage } from './modal-couponadded.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCouponaddedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCouponaddedPageRoutingModule {}
