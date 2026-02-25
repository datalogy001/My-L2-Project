import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupNotAppliedModalPage } from './topup-not-applied-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TopupNotAppliedModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupNotAppliedModalPageRoutingModule {}
