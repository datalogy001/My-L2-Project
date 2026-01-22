import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessModelEsimPage } from './success-model-esim.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessModelEsimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessModelEsimPageRoutingModule {}
