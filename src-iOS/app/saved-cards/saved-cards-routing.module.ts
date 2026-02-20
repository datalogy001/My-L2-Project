import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedCardsPage } from './saved-cards.page';

const routes: Routes = [
  {
    path: '',
    component: SavedCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedCardsPageRoutingModule {}
