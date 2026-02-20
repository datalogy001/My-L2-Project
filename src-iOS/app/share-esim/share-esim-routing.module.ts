import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareEsimPage } from './share-esim.page';

const routes: Routes = [
  {
    path: '',
    component: ShareEsimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareEsimPageRoutingModule {}
