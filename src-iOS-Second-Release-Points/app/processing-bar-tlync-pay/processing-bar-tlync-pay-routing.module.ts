import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessingBarTlyncPayPage } from './processing-bar-tlync-pay.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessingBarTlyncPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingBarTlyncPayPageRoutingModule {}
