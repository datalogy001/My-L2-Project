import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCountryOptPage } from './modal-country-opt.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCountryOptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCountryOptPageRoutingModule {}
