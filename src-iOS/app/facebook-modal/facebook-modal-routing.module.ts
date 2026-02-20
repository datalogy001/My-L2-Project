import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacebookModalPage } from './facebook-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FacebookModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacebookModalPageRoutingModule {}
