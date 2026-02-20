import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessingBarPage } from './processing-bar.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessingBarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingBarPageRoutingModule {}
