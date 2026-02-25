import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessingBarGooglePayTopupPage } from './processing-bar-google-pay-topup.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessingBarGooglePayTopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingBarGooglePayTopupPageRoutingModule {}
