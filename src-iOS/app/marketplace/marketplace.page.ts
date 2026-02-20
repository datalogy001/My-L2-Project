import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnInit {

  constructor(private iab: InAppBrowser, private translate: TranslateService,private navController: NavController) { }


  ngOnInit() {
  }

  gotoBack()
  {
    this.navController.pop();
  }
  gototab5() {
    if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
this.navController.navigateRoot('tab5');
else
this.navController.navigateRoot('profile');
  }
  gototab1() {
    this.navController.navigateRoot('tab1');
  }
  
  gototab2() {
    this.navController.navigateRoot('tab2');
  }


}
