import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCodenotworkPage } from './modal-codenotwork.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCodenotworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCodenotworkPageRoutingModule {}
