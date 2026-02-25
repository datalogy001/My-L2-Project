import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseCardPage } from './choose-card.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseCardPageRoutingModule {}
