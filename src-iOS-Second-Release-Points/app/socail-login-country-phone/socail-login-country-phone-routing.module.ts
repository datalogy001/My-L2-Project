import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocailLoginCountryPhonePage } from './socail-login-country-phone.page';

const routes: Routes = [
  {
    path: '',
    component: SocailLoginCountryPhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocailLoginCountryPhonePageRoutingModule {}
