import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteCardPageRoutingModule } from './delete-card-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { DeleteCardPage } from './delete-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    DeleteCardPageRoutingModule
  ],
  declarations: [DeleteCardPage]
})
export class DeleteCardPageModule {}
