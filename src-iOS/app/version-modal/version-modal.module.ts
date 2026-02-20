import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VersionMOdalPageRoutingModule } from './version-modal-routing.module';

import { VersionMOdalPage } from './version-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VersionMOdalPageRoutingModule
  ],
  declarations: [VersionMOdalPage]
})
export class VersionMOdalPageModule {}
