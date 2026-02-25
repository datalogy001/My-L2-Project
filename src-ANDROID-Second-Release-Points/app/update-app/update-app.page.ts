import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Market } from '@ionic-native/market/ngx';
@Component({
  selector: 'app-update-app',
  templateUrl: './update-app.page.html',
  styleUrls: ['./update-app.page.scss'],
})
export class UpdateAppPage implements OnInit {
  constructor(private market: Market,private platform: Platform) {}

  ngOnInit() {
  }

  updateNow() {
      this.market.open('com.L2TravelSIMData');
  }
  
}
