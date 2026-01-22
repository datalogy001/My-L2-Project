import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupSuccessPage } from './topup-success.page';

const routes: Routes = [
  {
    path: '',
    component: TopupSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupSuccessPageRoutingModule {}
