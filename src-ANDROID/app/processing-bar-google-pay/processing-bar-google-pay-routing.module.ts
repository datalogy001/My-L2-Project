import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessingBarGooglePayPage } from './processing-bar-google-pay.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessingBarGooglePayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingBarGooglePayPageRoutingModule {}
