import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupSocialreferPage } from './signup-socialrefer.page';

const routes: Routes = [
  {
    path: '',
    component: SignupSocialreferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupSocialreferPageRoutingModule {}
