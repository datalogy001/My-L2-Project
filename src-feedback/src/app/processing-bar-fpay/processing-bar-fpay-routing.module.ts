import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessingBarFpayPage } from './processing-bar-fpay.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessingBarFpayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingBarFpayPageRoutingModule {}
