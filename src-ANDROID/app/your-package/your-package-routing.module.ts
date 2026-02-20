import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourPackagePage } from './your-package.page';

const routes: Routes = [
  {
    path: '',
    component: YourPackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourPackagePageRoutingModule {}
