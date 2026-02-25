import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ServicesService } from '../api/services.service';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController, NavController,Platform } from '@ionic/angular';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'app-bundle-data-topup',
  templateUrl: './bundle-data-topup.page.html',
  styleUrls: ['./bundle-data-topup.page.scss'],
})
export class BundleDataTopupPage implements OnInit {

  constructor(private platform:Platform, private translate: TranslateService,private loadingScreen: LoadingScreenAppPage, private navController: NavController, private modalController: ModalController, private apiService: ServicesService, private Router: Router, private elementRef: ElementRef) {
  }
  tempData: any = [];
  bundleName: any = '';
  bundleiSO: any = '';
  bundleType: any = '';
  bundleList: any = [];
  currencyCode: any = 'USD';
  isLoading: any = true;
  todaysDate: any = '';
  rate: any = '';
  networkImages: any = [];
  commissionRate:any;
  iccid:any ='';
  paramObj:any = {'iso' : '', 'type': '', 'to_currency':''};
  unlimitedBundles:any=[];
  nonUnlimitedBundles:any=[]; 
  isDataPlan: any= false; 
  userDetails:any=[];
  checkoutObj: any = { 'types' :'', 'isUnlimited' : '', 'id': '', 'networkLogos': [], 'networksData': [], 'iccid': '', 'actualAmount': '', 'extraAmount': '', 'currency': '', 'bundleData': [], 'paymentId': '', 'PayerID': '', 'token': '' };
  
    

  lang:any;
  ngOnInit() {
    this.lang = window.localStorage.getItem("L2TraveleSIM_language") || 'en';
    //Get currency 
    if (window.localStorage.getItem("L2TraveleSIM_currency") == null) {
      this.currencyCode = 'USD';
      this.paramObj.to_currency =  'USD';
    } else {
      this.currencyCode = window.localStorage.getItem("L2TraveleSIM_currency");
      this.paramObj.to_currency = window.localStorage.getItem("L2TraveleSIM_currency");
    }
    //Get parameters 
    this.tempData = this.Router.getCurrentNavigation()?.extras.state;
    this.checkoutObj.types = this.tempData.type;
    if(this.tempData.type =='country')
      this.bundleName =  this.translate.instant(`COUNTRIES.${this.tempData.iso}`) 
    else
    this.bundleName =  this.translate.instant(`ZONES.${this.tempData.iso}`) 
    if (this.tempData.iso == 'North America') {
      this.bundleiSO = 'North_America';
    } else if (this.tempData.iso == 'Middle East') {
      this.bundleiSO = 'Middle_East';
    }  else if (this.tempData.iso == 'CY') {
      this.bundleiSO = 'CY';
    
  }  else if (this.tempData.iso == 'ZM') {
    this.bundleiSO = 'ZM';
  } 
    else {
      this.bundleiSO = this.tempData.iso;
    }

    this.bundleType = this.tempData.type;
    this.paramObj.iso = this.tempData.iso == 'Europe+' ? 'Europe' : this.tempData.iso;
    this.paramObj.type = this.tempData.type;
    this.paramObj.opt = this.tempData.opt;
    this.iccid = this.tempData.iccid;
  
    this.getBundles();
    this.getListOfImages(this.bundleName);
    if (window.localStorage.getItem('L2TraveleSIM_auth_token') != null) {
        this.userDetails = window.localStorage.getItem('L2TraveleSIM_userDetails');
      this.userDetails = JSON.parse(this.userDetails);
      this.checkoutObj.id = this.userDetails.id;
    }

  }

//Get Bundle List 
async getBundles() {

  await this.loadingScreen.presentLoading();
  this.apiService.getBundleFromDB(this.paramObj).then((res: any) => {
    if (res.data[0].length > 0) {
      this.loadingScreen.dismissLoading();
     // this.isLoading =true;
      this.isDataPlan =true;
      const bundles = res.data[0];
    this.unlimitedBundles = bundles.filter((bundle :any) => bundle.unlimited == true && bundle.price != 0);
    this.nonUnlimitedBundles = bundles.filter((bundle :any) => bundle.unlimited == false);
    } else {
      this.loadingScreen.dismissLoading();
      this.bundleList = [];
    //  this.isLoading =false;
      this.isDataPlan =false;
    }
}).catch(err => {
    this.loadingScreen.dismissLoading();
   // this.isLoading =false;
    this.isDataPlan =false;
  })
}

getBackgroundUrl() {
  return `url('assets/countryBanners/${this.bundleiSO}.jpg') no-repeat center top / cover`;
}

gotoSummary(bundleItem: any, isUnlimited:any) {
  
    this.checkoutObj.actualAmount = bundleItem.org_price;
    this.checkoutObj.extraAmount = bundleItem.price;
    this.checkoutObj.currency = this.currencyCode;
    this.checkoutObj.bundleData = bundleItem;
    this.checkoutObj.iccid = this.iccid
    this.checkoutObj.networkLogos = this.networkImages,
    this.checkoutObj.isUnlimited = isUnlimited;

  let navigationExtras: NavigationExtras = {
    state: {
      checkoutData: this.checkoutObj,
      withOutLogin: true
    }
  };

 console.log(JSON.stringify( this.checkoutObj));
 
  if (window.localStorage.getItem('L2TraveleSIM_auth_token') != null)
    this.Router.navigate(['/payment-datatopup'], navigationExtras);
  else
    this.Router.navigate(['/login-prompt'], navigationExtras);

}


getListOfImages(countryName: any) {
  this.apiService.getListOfImages(countryName).then((res: any) => {
    if (res.data.length > 0) {
      this.networkImages = res.data;
    } else {
      this.networkImages = [];
    }

  }).catch(err => {
    console.log("Something went wrong");
  })
}

gotoBack() {
  this.navController.pop();
}
  gotoTab5() {
   if (!window.localStorage.getItem('L2TraveleSIM_auth_token')) {
    this.navController.navigateRoot('tab5');
} else {
    this.navController.navigateRoot('profile');
}
  }

  gotoTab2() {
    this.navController.navigateRoot(['tab2']);
  }
  
  gotoMarketPlace()
	  {
      this.Router.navigate(['marketplace']);
	  }


 gotoTab1()
  {
    this.Router.navigate(['tab1']);
  }


//End of common footers

    gotoHomeSearch() {
        this.Router.navigate(['home-search']);
    }       

    gotFAQ()
{
  this.Router.navigate(['/faq']);
}

}
