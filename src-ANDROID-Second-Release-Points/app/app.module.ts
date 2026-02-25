import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { InAppBrowser} from '@ionic-native/in-app-browser/ngx'

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import {Stripe} from "@ionic-native/stripe/ngx";
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import {LoadingScreenAppPage} from '../app/loading-screen-app/loading-screen-app.page'
import {Network} from '@ionic-native/network/ngx'
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {Clipboard} from '@ionic-native/clipboard/ngx';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Market} from '@ionic-native/market/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import {Device} from '@ionic-native/device/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FirebaseAnalytics} from '@ionic-native/firebase-analytics/ngx';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot({
      rippleEffect: true,
    mode: 'md'
    }), AppRoutingModule,  HttpClientModule],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },Clipboard, Camera, Keyboard,Market,FirebaseAnalytics,FileOpener , Device, StatusBar, GooglePlus, Network, LoadingScreenAppPage, EmailComposer, File,InAppBrowser, SocialSharing, Stripe,FileTransfer],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
