import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordErrorPage } from './password-error.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordErrorPageRoutingModule {}
