import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadEsimPage } from './download-esim.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadEsimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadEsimPageRoutingModule {}
