import { Component, OnInit } from '@angular/core';
import { Platform, NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';

@Component({
  selector: 'app-compatible-device',
  templateUrl: './compatible-device.page.html',
  styleUrls: ['./compatible-device.page.scss'],
})
export class CompatibleDevicePage implements OnInit {

  constructor(private loadingScreen: LoadingScreenAppPage,private platform: Platform,private modalCtrl: ModalController,private toastController: ToastController, private navController: NavController) { }
  plat:any;
  isSelected:any=false;



  ngOnInit() {
    if(this.platform.is('android'))
      this.plat = true;
      else
      this.plat = false;
  }

    gotoBack() {
    this.navController.pop();
  }

  

  
  gotoMarketPlace()
	  {
	    this.navController.navigateRoot('marketplace');
	  }

  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }
    gotoTab5() {
    if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
  this.navController.navigateRoot('tab5');
  else
  this.navController.navigateRoot('profile');
    }

  gotoHomeSearch()
  {
    this.navController.navigateRoot('home-search');
  }
  
}
