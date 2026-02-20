import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPromptPage } from './login-prompt.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPromptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPromptPageRoutingModule {}
