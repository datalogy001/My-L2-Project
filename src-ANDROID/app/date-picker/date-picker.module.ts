import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DatePickerPageRoutingModule } from './date-picker-routing.module';

import { DatePickerPage } from './date-picker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    DatePickerPageRoutingModule
  ],
  declarations: [DatePickerPage]
})
export class DatePickerPageModule {}
