import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountCreatedPage } from './account-created.page';

const routes: Routes = [
  {
    path: '',
    component: AccountCreatedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountCreatedPageRoutingModule {}
