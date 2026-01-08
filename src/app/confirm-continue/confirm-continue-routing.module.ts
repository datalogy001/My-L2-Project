import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmContinuePage } from './confirm-continue.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmContinuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmContinuePageRoutingModule {}
