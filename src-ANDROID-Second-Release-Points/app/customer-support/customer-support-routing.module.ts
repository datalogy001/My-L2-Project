import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerSupportPage } from './customer-support.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerSupportPageRoutingModule {}
