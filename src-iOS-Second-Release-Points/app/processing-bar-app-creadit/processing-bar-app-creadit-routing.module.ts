import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessingBarAppCreaditPage } from './processing-bar-app-creadit.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessingBarAppCreaditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingBarAppCreaditPageRoutingModule {}
