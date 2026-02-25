import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetSuccessPage } from './reset-success.page';

const routes: Routes = [
  {
    path: '',
    component: ResetSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetSuccessPageRoutingModule {}
