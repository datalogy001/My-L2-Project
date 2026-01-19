import { Component, OnInit, ViewChild,AfterViewInit, NgZone   } from '@angular/core';
import { NavController, ToastController, PopoverController, ModalController, Platform, AlertController } from "@ionic/angular";
import { SuccessModelPage } from '../success-model/success-model.page';
import { Router, NavigationExtras } from '@angular/router';

import { ServicesService } from '../api/services.service';
import { IonContent } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http'
import { ZendeskService } from '../api/zendesk.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { VersionMOdalPage } from '../version-modal/version-modal.page';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})


export class Tab5Page implements OnInit     {
  tempDetails: any = [];
  tokenValue: any = '';
  terms: any = [];
  aboutUs: any = [];
  privacy: any = [];
  googleAccessToken: any;
  loginType: any;


  @ViewChild(IonContent, { static: false }) content?: IonContent;
  constructor( private translate: TranslateService,private ngZone: NgZone, private loadingScreen: LoadingScreenAppPage,private inAppBrowser: InAppBrowser, private zendeskService: ZendeskService, private alertController: AlertController, private platform: Platform, private http: HttpClient, private service: ServicesService, private navCtrl: NavController, private toastController: ToastController, private Router: Router, private modalController: ModalController) { }
  private zendeskKey = '7f8c1f28-f661-4acd-9387-81602e1d4abe'; // Replace with your actual Zendesk ke

  isDeletedObj: any = { 'user_id': '' };
  tempArr: any = [];
  userDetails: any = [];
  authToken: any;
  notificationList: any = [];
  notiCount: any = 0;


  showVersion: boolean = false;

  toggleAppVersion() {
    this.showVersion = !this.showVersion;
  }



  ngOnInit() {
   
  }

locale:any;
async openZendeskChat() {
  /*await this.loadingScreen.presentLoading();
  setTimeout(() => {
    this.loadingScreen.dismissLoading();
  }, 300); */
  this.locale = window.localStorage.getItem("L2TraveleSIM_language") || 'en';
  this.zendeskService.loadZendesk(this.locale);
}

ngOnDestroy() {
  this.zendeskService.unloadZendesk();
}
  async getNotificationList() {
    this.service.getNotificationList(this.tokenValue).then((res: any) => {
      if (res.code == 200) {
        if (res.data.readnotification.length > 0) {
          this.notificationList = res.data.readnotification;
          this.notiCount = res.data.unreadcount;
        }
        else
          this.notificationList = [];
      } else {
        this.notificationList = [];
      }
    }).catch(err => {
      this.notificationList = [];
    })

  }
  lang:any;
  ionViewDidEnter() {
    
    this.content?.scrollToTop();
    if (window.localStorage.getItem('L2TraveleSIM_userDetails') != null) {
      this.tempDetails = window.localStorage.getItem('L2TraveleSIM_userDetails');
      //alert("Tab5" + JSON.stringify(this.tempDetails));
      this.loginType = window.localStorage.getItem('L2TraveleSIM_loginType');
      this.tempDetails = JSON.parse(this.tempDetails);
 // Set default language if not found in local storage
this.lang = window.localStorage.getItem("L2TraveleSIM_language") || 'en';

// Check if tempDetails and first_name are defined
if (this.tempDetails && typeof this.tempDetails.first_name === 'string') {
  // Normalize the first_name to lowercase to avoid multiple checks
  if (this.tempDetails.first_name.toLowerCase() === 'guest') {
    // Assign first_name based on selected language
    switch (this.lang) {
      case 'ar':
        this.tempDetails.first_name = 'ضيف';
        break;

      default:
        this.tempDetails.first_name = 'Guest';
        break;
    }
  }
}
      if (window.localStorage.getItem('L2TraveleSIM_auth_token') == null) {
        this.tokenValue = 0;
      }
      else {
        this.tokenValue = window.localStorage.getItem('L2TraveleSIM_auth_token');
        this.getNotificationList();
      }
    } else {
      this.tempDetails = [];
      this.tokenValue = 0;
    }
  }


  login() {
    let navigationExtras: NavigationExtras = {
      state: {
        checkoutData: [],
        withOutLogin: false
      }
    };
    this.Router.navigate(['/login'], navigationExtras);
  }

  createAccount() {
    let navigationExtras: NavigationExtras = {
      state: {
        checkoutData: [],
        withOutLogin: false
      }
    };
    this.Router.navigate(['/create-account'], navigationExtras);
  }


  //Logout Modal
  async logout() {
    this.Router.navigate(['/logout']);
  }


  async gotoeSIMcompatiability()
  {
    this.Router.navigate(['/compatible-device']);    
  }

  async gotoFAQ() {
    this.Router.navigate(['/faq']);
  }

  async gotoCustomerSupport() {
    this.Router.navigate(['/customer-support']);
  }




  async gotoNotiSettings() {
    this.Router.navigate(['/notification-settings']);
  }

  async gotoCurrencySettings() {
    this.Router.navigate(['/select-currency']);
  }

  async gotoLanguageSettings() {
    this.Router.navigate(['/language-settings']);
  }



  gotoNoti() {
    let navigationExtras: NavigationExtras = {
      state: {
        notiData: this.notificationList,
      }
    };
    this.Router.navigate(['/notifications'], navigationExtras);
  }



  async gotoPrivacy() {
    this.Router.navigate(['/privacy']);
  }


  async gotoTerms() {
    this.Router.navigate(['/terms-conditions']);
  }

  async gotoAboutus() {
    this.Router.navigate(['/aboutus']);
  }



  //Common Footers
  gotoTab1() {
    this.navCtrl.navigateRoot('tab1');
  }
  gotoTab4() {
    this.navCtrl.navigateRoot('tab4');
  }
  gotoTab2() {
    this.navCtrl.navigateRoot('tab2');
  }

  gotoMarketPlace()
	  {
	    this.navCtrl.navigateRoot('marketplace');
	  }


    
  gotoTab5()
  {
    if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
      this.navCtrl.navigateRoot(['tab5']);
      else
      this.navCtrl.navigateRoot(['profile']);
  }
  //End of common footers

   // Error Modal
   async errorMSGModal() {
       const modal = await this.modalController.create({
      component: VersionMOdalPage,
      componentProps: { 'value1': this.translate.instant('version')+ " 1.3.8", 'value': this.translate.instant('VALIDATION_MSG_BUTTON') }
    });

    modal.onDidDismiss();
    return await modal.present();
  }


}
