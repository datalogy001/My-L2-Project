import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatedSuccessfulPage } from './created-successful.page';

const routes: Routes = [
  {
    path: '',
    component: CreatedSuccessfulPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatedSuccessfulPageRoutingModule {}
