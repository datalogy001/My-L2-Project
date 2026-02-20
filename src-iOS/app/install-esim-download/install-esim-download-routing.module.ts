import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstallEsimDownloadPage } from './install-esim-download.page';

const routes: Routes = [
  {
    path: '',
    component: InstallEsimDownloadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstallEsimDownloadPageRoutingModule {}
