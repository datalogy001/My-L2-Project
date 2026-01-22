import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationResetPage } from './verification-reset.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationResetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationResetPageRoutingModule {}
