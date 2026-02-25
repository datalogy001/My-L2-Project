import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteCardPage } from './delete-card.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteCardPageRoutingModule {}
