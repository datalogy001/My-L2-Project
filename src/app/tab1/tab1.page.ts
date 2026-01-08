import { ServicesService } from '../api/services.service';
import Swiper from 'swiper';

import { Router, NavigationExtras } from '@angular/router';
import { NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SharenowPage } from '../sharenow/sharenow.page';
import { DownloadEsimPage } from '../../app/download-esim/download-esim.page';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isLogin: any = true;
  selectedSegment: string = 'active';
  token: any = '';
  bundleActiveList: any = [];
  bundleInactiveList: any = [];
  bundleExpiredList: any = [];
  bundleTopupAgain: any = [];
  txt: any = '';
  qrImg: any = '';
  isData: any = true;
  notificationList: any = [];
  notiCount: any = 0;
  isDataAvailActive: any = true;
  isDataAvailInActive: any = true;

  isDeletedObj: any = { 'user_id': '' };
  tempArr: any = [];
  userDetails: any = [];
  authToken: any;

  constructor(private translate: TranslateService, private toastController: ToastController, private loadingScreen: LoadingScreenAppPage, private modalController: ModalController, private apiService: ServicesService, private Router: Router, private navCtrl: NavController, private elementRef: ElementRef, private renderer: Renderer2) {
  }

  handleRefresh(event: any) {
    if (window.localStorage.getItem("L2TraveleSIM_auth_token") == null) {
      this.isLogin = false;
      this.isDataAvailActive = false;
      this.isDataAvailInActive = false;
      event.target.complete();
    }
    else {
      this.isLogin = true;
      this.token = window.localStorage.getItem("L2TraveleSIM_auth_token");
      this.isDataAvailActive = true;
      this.isDataAvailInActive = true;
      this.bundleActiveList = [];
      this.bundleInactiveList = [];
      this.bundleExpiredList = [];
      this.bundleTopupAgain = [];
      this.gotoPurchasedBundles();
      event.target.complete();
    }
  }

  blankArr:any=[]; 

  async gotoPurchasedBundlesREF()
{
this.apiService.gotoPurchasedBundles(this.token).then((res: any) => {
  if (res.code == 200) {
    console.log(res.data.data.length);
    if (res.data.data.length > 0) {
      try {
        // Retrieve data from localStorage
        const bundlesString = JSON.stringify(res.data.data);
        this.storageBundles = bundlesString ? JSON.parse(bundlesString) : [];
  
        // Check if the parsed storageBundles is a valid array
        if (Array.isArray(this.storageBundles) && this.storageBundles.length > 0) {
          // Clear the lists before populating
          this.bundleActiveList = [];
          this.bundleInactiveList = [];
          this.bundleTopupAgain = [];
          this.bundleExpiredList = [];
  
          // Categorize the bundles based on profile_status
          this.storageBundles.forEach((bundle: any) => {
            switch (bundle.profile_status) {
              case "Expired":
                this.bundleExpiredList.push(bundle);
                break;
              case "Inactive":
                this.bundleInactiveList.push(bundle);
                break;
              case "Active":
                this.bundleActiveList.push(bundle);
                break;
              case "Topup":
                this.bundleTopupAgain.push(bundle);
                break;
            }
          });

          console.log(this.bundleActiveList.length);
          console.log(this.bundleTopupAgain.length);
          console.log(this.bundleInactiveList.length );
          console.log(this.bundleExpiredList.length );

  
          // Set data availability flags
          this.isDataAvailActive = this.bundleActiveList.length > 0 || this.bundleTopupAgain.length > 0;
          this.isDataAvailInActive = this.bundleInactiveList.length > 0 || this.bundleExpiredList.length > 0;
  
          // Default to 'inactive' segment if no active data is available
          const savedSegment = sessionStorage.getItem('selectedSegment');
          if (savedSegment) {
            this.selectedSegment = savedSegment;
            sessionStorage.removeItem('selectedSegment'); // Clear the storage after retrieval
          } else {
            this.selectedSegment = this.isDataAvailActive ? 'active' : 'inactive';
          }
        } else {
          // If no bundles are found, reset flags and lists
          this.resetBundleData();
        }
      } catch (error) {
        console.error("Error fetching bundles from localStorage:", error);
        this.resetBundleData();
      }
    }else
    {
      console.log("Hi I m here");
      this.bundleActiveList = [];
      this.bundleInactiveList = [];
      this.bundleTopupAgain = [];
      this.bundleExpiredList = [];
      this.isDataAvailActive = false;
      this.isDataAvailInActive = false;
    }
  }else
  {
 //   this.loadingScreen.dismissLoading();
  }
}).catch(err => {
  //this.loadingScreen.dismissLoading();
  this.bundleActiveList = [];
  this.bundleInactiveList = [];
  this.bundleTopupAgain = [];
  this.bundleExpiredList = [];
  this.isDataAvailActive = false;
  this.isDataAvailInActive = false;

})
}

  

  async gotoPurchasedBundles()
{
await this.loadingScreen.presentLoading();
this.apiService.gotoPurchasedBundles(this.token).then((res: any) => {
  if (res.code == 200) {
    this.loadingScreen.dismissLoading();
    console.log(res.data.data.length);
    if (res.data.data.length > 0) {
      try {
        // Retrieve data from localStorage
        const bundlesString = JSON.stringify(res.data.data);
        this.storageBundles = bundlesString ? JSON.parse(bundlesString) : [];
  
        // Check if the parsed storageBundles is a valid array
        if (Array.isArray(this.storageBundles) && this.storageBundles.length > 0) {
          // Clear the lists before populating
          this.bundleActiveList = [];
          this.bundleInactiveList = [];
          this.bundleTopupAgain = [];
          this.bundleExpiredList = [];
  
          // Categorize the bundles based on profile_status
          this.storageBundles.forEach((bundle: any) => {
            switch (bundle.profile_status) {
              case "Expired":
                this.bundleExpiredList.push(bundle);
                break;
              case "Inactive":
                this.bundleInactiveList.push(bundle);
                break;
              case "Active":
                this.bundleActiveList.push(bundle);
                break;
              case "Topup":
                this.bundleTopupAgain.push(bundle);
                break;
            }
          });

          console.log(this.bundleActiveList.length);
          console.log(this.bundleTopupAgain.length);
          console.log(this.bundleInactiveList.length );
          console.log(this.bundleExpiredList.length );

  
          // Set data availability flags
          this.isDataAvailActive = this.bundleActiveList.length > 0 || this.bundleTopupAgain.length > 0;
          this.isDataAvailInActive = this.bundleInactiveList.length > 0 || this.bundleExpiredList.length > 0;
  
          // Default to 'inactive' segment if no active data is available
          const savedSegment = sessionStorage.getItem('selectedSegment');
          if (savedSegment) {
            this.selectedSegment = savedSegment;
            sessionStorage.removeItem('selectedSegment'); // Clear the storage after retrieval
          } else {
            this.selectedSegment = this.isDataAvailActive ? 'active' : 'inactive';
          }
        } else {
          // If no bundles are found, reset flags and lists
          this.resetBundleData();
        }
      } catch (error) {
        console.error("Error fetching bundles from localStorage:", error);
        this.resetBundleData();
      }
    }else
    {
      console.log("Hi I m here");
      this.bundleActiveList = [];
      this.bundleInactiveList = [];
      this.bundleTopupAgain = [];
      this.bundleExpiredList = [];
      this.isDataAvailActive = false;
      this.isDataAvailInActive = false;
    }
  }else
  {
    this.loadingScreen.dismissLoading();
  }
}).catch(err => {
  this.loadingScreen.dismissLoading();
  this.bundleActiveList = [];
  this.bundleInactiveList = [];
  this.bundleTopupAgain = [];
  this.bundleExpiredList = [];
  this.isDataAvailActive = false;
  this.isDataAvailInActive = false;

})
}

  
 
  storageBundles: any = [];

  
  hasLoadedOnce = false;

ionViewDidEnter() {
  const savedSegment = sessionStorage.getItem('L2TraveleSIM_selectedSegment');
  if (savedSegment) {
    this.selectedSegment = savedSegment;
    sessionStorage.removeItem('L2TraveleSIM_selectedSegment');
  } else {
    this.selectedSegment = 'active';
  }

  if (window.localStorage.getItem("L2TraveleSIM_auth_token") == null) {
    this.isLogin = false;
    this.isDataAvailActive = false;
    this.isDataAvailInActive = false;
  } else {
    this.isLogin = true;
    this.isDataAvailActive = true;
    this.isDataAvailInActive = true;

    if (!this.hasLoadedOnce) {
      console.log("API calling first time only");
      this.token = window.localStorage.getItem("L2TraveleSIM_auth_token");
      this.getNotificationList();
      this.gotoPurchasedBundles();
      this.hasLoadedOnce = true;
    } else {
         console.log(this.bundleActiveList.length);
          console.log(this.bundleTopupAgain.length);
          console.log(this.bundleInactiveList.length );
          console.log(this.bundleExpiredList.length );
    this.gotoPurchasedBundlesREF();
      console.log("Skip API calls on back navigation");
    }
  }
}

  ngOnInit() {
   this.bundleActiveList = [];
    this.bundleInactiveList = [];
    this.bundleExpiredList = [];
    this.bundleTopupAgain = [];
    
  }

  // Helper function to reset lists and flags
  resetBundleData() {
    this.isDataAvailActive = false;
    this.isDataAvailInActive = false;
    this.bundleActiveList = [];
    this.bundleInactiveList = [];
    this.bundleTopupAgain = [];
    this.bundleExpiredList = [];
  }


  async getNotificationList() {
    this.apiService.getNotificationList(this.token).then((res: any) => {
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

  convertintoCountryLang(countryName: any) {
    // Convert countryName to uppercase
    const upperCaseCountryName = countryName.toUpperCase();
    // Use the uppercase countryName in the translation key
    return this.translate.instant(`COUNTRIES.${upperCaseCountryName}`);
  }

  convertintoZoneLang(zones: any) {
    return this.translate.instant(`ZONES.${zones}`)
  }

  
  gotoNoti() {
    let navigationExtras: NavigationExtras = {
      state: {
        notiData: this.notificationList,
      }
    };
    sessionStorage.setItem('L2TraveleSIM_selectedSegment', this.selectedSegment);
    this.Router.navigate(['/notifications'], navigationExtras);
  }

  gotoDetails(bundleItems: any, status: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        bundleData: bundleItems,
        bundleStatus: status
      }
    };
    sessionStorage.setItem('L2TraveleSIM_selectedSegment', this.selectedSegment);

    if (status == 'inactive' || status == 'expired')
      this.Router.navigate(['/your-plan'], navigationExtras);
    else
      this.Router.navigate(['/your-package'], navigationExtras);
  }

  async gotoInstallESIM(item: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        sharingData: item,
        iccid: item.iccid
      }
    };
    sessionStorage.setItem('L2TraveleSIM_selectedSegment', this.selectedSegment);
    this.Router.navigate(['/install-esim'], navigationExtras);
  }


  async gotoShare(item: any) {
    if (item.isUnlimited == false) {
      this.txt = item.country + ": " + item.dataamount + this.translate.instant('GB_for') + item.days;
    } else {
      this.txt = item.country + ":" + this.translate.instant('UNLIMITED_DAILY_PASS_FOR') + item.days;
    }

    console.log(this.txt);

    this.qrImg = item.qr_img_link;

    const modal = await this.modalController.create({
      component: SharenowPage,
      componentProps: { value: item.iccid, value1: this.txt, value2: this.qrImg, value3: item.smdpAddress, value4: item.matchingId }
    });

    modal.onDidDismiss();
    return await modal.present();
  }


  gotoDataBundle() {
    this.navCtrl.navigateRoot('/tab2');
  }

  gotoHomeSearch() {
    this.navCtrl.navigateRoot('home-search');
  }

  gotoMarketPlace()
  {
    this.navCtrl.navigateRoot('marketplace');
  }

  //Common Footers
  gotoTab2() {
    this.navCtrl.navigateRoot('tab2');
  }
  gotoTab4() {
    this.navCtrl.navigateRoot('tab4');
  }
  gotoTab5() {
if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
this.navCtrl.navigateRoot('tab5');
else
this.navCtrl.navigateRoot('profile');
  }
  //End of common footers
}
