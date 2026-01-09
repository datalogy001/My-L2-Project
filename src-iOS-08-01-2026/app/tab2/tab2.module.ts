import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { TranslateModule } from '@ngx-translate/core';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab2PageModule {}
