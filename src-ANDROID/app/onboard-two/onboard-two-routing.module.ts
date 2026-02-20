import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardTwoPage } from './onboard-two.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardTwoPageRoutingModule {}
