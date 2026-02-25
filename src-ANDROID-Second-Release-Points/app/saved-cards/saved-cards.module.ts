import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedCardsPageRoutingModule } from './saved-cards-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SavedCardsPage } from './saved-cards.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    SavedCardsPageRoutingModule
  ],
  declarations: [SavedCardsPage]
})
export class SavedCardsPageModule {}
