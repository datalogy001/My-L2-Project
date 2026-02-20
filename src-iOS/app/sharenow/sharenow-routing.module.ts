import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharenowPage } from './sharenow.page';

const routes: Routes = [
  {
    path: '',
    component: SharenowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharenowPageRoutingModule {}
