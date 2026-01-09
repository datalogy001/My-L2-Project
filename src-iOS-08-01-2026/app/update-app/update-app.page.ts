import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Market } from '@ionic-native/market/ngx';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-update-app',
  templateUrl: './update-app.page.html',
  styleUrls: ['./update-app.page.scss'],
})
export class UpdateAppPage implements OnInit {
  constructor(private iab: InAppBrowser,private market: Market,private platform: Platform) {}

  ngOnInit() {
  }

  updateNow() {
    if (this.platform.is('ios')) {
      // Redirect to the iOS App Store
      //Need to update for L2TraveleSIM
     this.iab.create('https://apps.apple.com/us/app/L2TravelSIMData', '_system');

    } else if (this.platform.is('android')) {
      // Redirect to the Google Play Store
      this.market.open('com.L2TravelSIMData');
    }

    // Note: Do not dismiss the modal here
  }
}
