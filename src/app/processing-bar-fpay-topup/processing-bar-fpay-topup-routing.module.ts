import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessingBarFpayTopupPage } from './processing-bar-fpay-topup.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessingBarFpayTopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingBarFpayTopupPageRoutingModule {}
