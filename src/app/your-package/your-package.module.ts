import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourPackagePageRoutingModule } from './your-package-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { YourPackagePage } from './your-package.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    YourPackagePageRoutingModule
  ],
  declarations: [YourPackagePage]
})
export class YourPackagePageModule {}
