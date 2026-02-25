import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDeleteprofilepicPage } from './modal-deleteprofilepic.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDeleteprofilepicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDeleteprofilepicPageRoutingModule {}
