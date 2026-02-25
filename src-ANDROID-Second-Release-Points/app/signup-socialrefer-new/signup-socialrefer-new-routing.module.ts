import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupSocialreferNewPage } from './signup-socialrefer-new.page';

const routes: Routes = [
  {
    path: '',
    component: SignupSocialreferNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupSocialreferNewPageRoutingModule {}
