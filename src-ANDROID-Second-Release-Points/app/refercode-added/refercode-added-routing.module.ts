import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefercodeAddedPage } from './refercode-added.page';

const routes: Routes = [
  {
    path: '',
    component: RefercodeAddedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefercodeAddedPageRoutingModule {}
