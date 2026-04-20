import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatePickerFpayPageRoutingModule } from './date-picker-fpay-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { DatePickerFpayPage } from './date-picker-fpay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DatePickerFpayPageRoutingModule
  ],
  declarations: [DatePickerFpayPage]
})
export class DatePickerFpayPageModule {}
