import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotLinksendPage } from './forgot-linksend.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotLinksendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotLinksendPageRoutingModule {}
