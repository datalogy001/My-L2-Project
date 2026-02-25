import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessingBarTlyncTopUpPayPage } from './processing-bar-tlync-top-up-pay.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessingBarTlyncTopUpPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingBarTlyncTopUpPayPageRoutingModule {}
