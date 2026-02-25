import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupsuccessPage } from './topupsuccess.page';

const routes: Routes = [
  {
    path: '',
    component: TopupsuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupsuccessPageRoutingModule {}
