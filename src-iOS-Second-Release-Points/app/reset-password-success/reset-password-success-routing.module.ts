import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordSuccessPage } from './reset-password-success.page';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordSuccessPageRoutingModule {}
