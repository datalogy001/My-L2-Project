import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatePickerFpayPage } from './date-picker-fpay.page';

const routes: Routes = [
  {
    path: '',
    component: DatePickerFpayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatePickerFpayPageRoutingModule {}
