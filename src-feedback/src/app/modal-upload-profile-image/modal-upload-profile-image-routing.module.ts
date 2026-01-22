import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalUploadProfileImagePage } from './modal-upload-profile-image.page';

const routes: Routes = [
  {
    path: '',
    component: ModalUploadProfileImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalUploadProfileImagePageRoutingModule {}
