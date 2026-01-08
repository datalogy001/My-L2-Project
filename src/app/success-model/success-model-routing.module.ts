import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessModelPage } from './success-model.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessModelPageRoutingModule {}
