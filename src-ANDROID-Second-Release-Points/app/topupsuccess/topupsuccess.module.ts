import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupsuccessPageRoutingModule } from './topupsuccess-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { TopupsuccessPage } from './topupsuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    TopupsuccessPageRoutingModule
  ],
  declarations: [TopupsuccessPage]
})
export class TopupsuccessPageModule {}
