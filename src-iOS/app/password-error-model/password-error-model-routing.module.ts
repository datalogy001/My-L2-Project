import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordErrorModelPage } from './password-error-model.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordErrorModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordErrorModelPageRoutingModule {}
