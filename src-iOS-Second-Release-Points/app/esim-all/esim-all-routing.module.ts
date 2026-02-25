import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsimAllPage } from './esim-all.page';

const routes: Routes = [
  {
    path: '',
    component: EsimAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsimAllPageRoutingModule {}
