import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalNocreditBalancePageRoutingModule } from './modal-nocredit-balance-routing.module';

import { ModalNocreditBalancePage } from './modal-nocredit-balance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalNocreditBalancePageRoutingModule
  ],
  declarations: [ModalNocreditBalancePage]
})
export class ModalNocreditBalancePageModule {}
