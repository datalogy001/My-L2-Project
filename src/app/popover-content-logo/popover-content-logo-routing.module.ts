import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoverContentLogoPage } from './popover-content-logo.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverContentLogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverContentLogoPageRoutingModule {}
