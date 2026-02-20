
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { QrLoaderPage } from '../qr-loader/qr-loader.page';
import { ServicesService } from '../api/services.service';
import OneSignalPlugin from 'onesignal-cordova-plugin';
@Component({
  selector: 'app-purchase-success',
  templateUrl: './purchase-success.page.html',
  styleUrls: ['./purchase-success.page.scss'],
})
export class PurchaseSuccessPage implements OnInit {

  tempDetails: any = [];
  sharingData: any = [];
  iccid: any;
  accessToken: any = '';
  cashBackRes:any=[]; 
  
  constructor(private platform: Platform,  private Router: Router, private modalController: ModalController,private service: ServicesService) { }

  lang: any;

  ngOnInit() {
    this.lang = window.localStorage.getItem("L2TraveleSIM_language") || 'en';
 //Notification Permission Popup 
    this.platform.ready().then(() => {
      if (this.platform.is('android') || this.platform.is('ios')) {
        OneSignalPlugin.setAppId('fff4239f-9ac8-4b82-a715-92df7445acf6');
      }
    });

    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.sharingData = this.tempDetails.sharingData;
    this.cashBackRes = this.tempDetails.cashbackRes;
    this.iccid = this.tempDetails.iccid;
    this.accessToken = window.localStorage.getItem('L2TraveleSIM_auth_token');
    //Check for Push notification 
    this.allowPopupPushNoti();
   //End 

    
    setTimeout(() => {
      let navigationExtras: NavigationExtras = {
        state: {
          sharingData: this.sharingData,
          iccid: this.iccid
        }
      };
    this.Router.navigate(['/installation'], navigationExtras);
  }, 2000);

  }

  async allowPopupPushNoti() {
    const notiSetting = window.localStorage.getItem('eSIM_IsNotiSettingAllow');
    // Check if permission has not been previously granted
    if (notiSetting === 'no' || notiSetting === null) {
      if (this.platform.is('android') || this.platform.is('ios')) {
        // Prompt the user for push notification permission
        OneSignalPlugin.promptForPushNotificationsWithUserResponse((accepted) => {
          if (accepted) {
            window.localStorage.setItem('eSIM_IsNotiSettingAllow', 'yes');
            // Only fetch device token if the user has accepted
            this.getDeviceToken();
          }
        });
      }
    } else {
      // If permission was previously granted, directly fetch the device token
      this.getDeviceToken();
    }
  }

// Fetch the device token
getDeviceToken() {
  setTimeout(() => {
    OneSignalPlugin.getDeviceState((response) => {
      try {
        const storedPlayerId = window.localStorage.getItem('L2TraveleSIM_PLAYER_ID');
        const playerId = storedPlayerId ?? response.userId;
        if (playerId) {
          window.localStorage.setItem('L2TraveleSIM_PLAYER_ID', playerId);
          this.updatePlayerId(playerId);
        }
      } catch (error) {
        console.error('Error fetching device token:', error);
      }
    });
  }, 500);
}  

userDetails:any=[]; 

pushDBToken: any = { 'deviceToken': '', 'userid': '' };

updatePlayerId(pushToken: any) {

  //Update token in db 
  if (this.accessToken != null) {

    this.userDetails = window.localStorage.getItem('L2TraveleSIM_userDetails');
    this.userDetails = JSON.parse(this.userDetails);
    this.pushDBToken.deviceToken = pushToken;
    this.pushDBToken.userid = this.userDetails.id;
    
    this.service.addPlayerId(this.pushDBToken, this.accessToken).then((res: any) => {
      if (res.code == 200) {
        console.log("Added player id");
      }
      else {
        console.log("unable to add player id");
      }
    }).catch(err => {
      console.log("Something went wrong");
    })
    //End 
  }
}
 


}
