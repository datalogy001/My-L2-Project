import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalLanguagechangePage } from './modal-languagechange.page';

const routes: Routes = [
  {
    path: '',
    component: ModalLanguagechangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalLanguagechangePageRoutingModule {}
