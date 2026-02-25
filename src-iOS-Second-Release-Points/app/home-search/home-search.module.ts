import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSearchPageRoutingModule } from './home-search-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HomeSearchPage } from './home-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HomeSearchPageRoutingModule
  ],
  declarations: [HomeSearchPage]
})
export class HomeSearchPageModule {}
