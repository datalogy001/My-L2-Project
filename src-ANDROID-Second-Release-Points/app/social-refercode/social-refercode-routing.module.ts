import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialRefercodePage } from './social-refercode.page';

const routes: Routes = [
  {
    path: '',
    component: SocialRefercodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialRefercodePageRoutingModule {}
