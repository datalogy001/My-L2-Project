import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCareconcPage } from './modal-careconc.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCareconcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCareconcPageRoutingModule {}
