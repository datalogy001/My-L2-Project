import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchCountryZonePage } from './search-country-zone.page';

const routes: Routes = [
  {
    path: '',
    component: SearchCountryZonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchCountryZonePageRoutingModule {}
