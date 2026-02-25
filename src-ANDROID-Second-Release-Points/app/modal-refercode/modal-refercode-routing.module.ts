import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalRefercodePage } from './modal-refercode.page';

const routes: Routes = [
  {
    path: '',
    component: ModalRefercodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalRefercodePageRoutingModule {}
