import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrLoaderPage } from './qr-loader.page';

const routes: Routes = [
  {
    path: '',
    component: QrLoaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrLoaderPageRoutingModule {}
