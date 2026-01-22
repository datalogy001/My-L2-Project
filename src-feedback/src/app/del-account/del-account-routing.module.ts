import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DelAccountPage } from './del-account.page';

const routes: Routes = [
  {
    path: '',
    component: DelAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DelAccountPageRoutingModule {}
