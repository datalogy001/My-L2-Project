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
     this.iab.create('https://apps.apple.com/us/app/l2-travel-sim-global-internet/id6756538973', '_system');
  }
}
