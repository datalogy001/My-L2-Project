import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoPlanPage } from './no-plan.page';

const routes: Routes = [
  {
    path: '',
    component: NoPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoPlanPageRoutingModule {}
