import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core'
import { ModalUploadProfileImagePageRoutingModule } from './modal-upload-profile-image-routing.module';

import { ModalUploadProfileImagePage } from './modal-upload-profile-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ModalUploadProfileImagePageRoutingModule
  ],
  declarations: [ModalUploadProfileImagePage]
})
export class ModalUploadProfileImagePageModule {}
