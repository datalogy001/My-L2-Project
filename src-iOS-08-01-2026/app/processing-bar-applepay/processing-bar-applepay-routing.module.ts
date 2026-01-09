import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessingBarApplepayPage } from './processing-bar-applepay.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessingBarApplepayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingBarApplepayPageRoutingModule {}
