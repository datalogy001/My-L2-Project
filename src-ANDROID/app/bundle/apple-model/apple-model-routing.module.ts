import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppleModelPage } from './apple-model.page';

const routes: Routes = [
  {
    path: '',
    component: AppleModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppleModelPageRoutingModule {}
