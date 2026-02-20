import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ServicesService } from '../api/services.service';
import { Router, NavigationExtras } from '@angular/router';

import { ModalController, NavController } from '@ionic/angular';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import * as moment from 'moment';
@Component({
  selector: 'app-esim-all',
  templateUrl: './esim-all.page.html',
  styleUrls: ['./esim-all.page.scss'],
})
export class EsimAllPage implements OnInit {

  constructor( private loadingScreen: LoadingScreenAppPage, private navController: NavController, private modalController: ModalController, private apiService: ServicesService, private Router: Router, private elementRef: ElementRef) {
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

  
  ngOnInit() {
    this.tempData = this.Router.getCurrentNavigation()?.extras.state;
    this.bundleName = this.tempData.name;
    this.iccid = this.tempData.iccid;
   // console.log(JSON.stringify( this.tempData));

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
    //IMP code
    if (window.localStorage.getItem("currency") == null) {
      this.currencyCode = 'USD';
    } else {
      this.currencyCode = window.localStorage.getItem("currency");
    }
    this.rate = window.localStorage.getItem('currency_rate');
    this.commissionRate = window.localStorage.getItem('commision');
    //End code

    this.getBundles();
    this.getListOfImages(this.bundleName);

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

  async getBundles() {
    await this.loadingScreen.presentLoading();
    this.todaysDate = moment().format('YYYY-MM-DD');

    if (window.localStorage.getItem('todays_date_bundle_' + this.bundleName) == null) {
      this.apiService.getBundlesList(this.bundleiSO, this.bundleType).then((res: any) => {
        if (res.data.length > 0) {
          this.loadingScreen.dismissLoading();
          this.isLoading =true;
          //IMP code
          if (window.localStorage.getItem('currency_rate') != null) {
            //this.rate ='';
            // this.rate = window.localStorage.getItem('currency_rate');
            this.bundleList =  JSON.parse(res.data[0].cache_value).bundles;
          } else {
            this.bundleList =  JSON.parse(res.data[0].cache_value).bundles;
          }

          //End code 

          window.localStorage.setItem('bundle_' + this.bundleName, JSON.stringify(this.bundleList));
          window.localStorage.setItem('todays_date_bundle_' + this.bundleName, this.todaysDate);
        } else {
          this.loadingScreen.dismissLoading();
          this.bundleList = [];
          this.isLoading =false;
        }

      }).catch(err => {
        this.loadingScreen.dismissLoading();
        this.isLoading =false;
      })
    } else if (window.localStorage.getItem('todays_date_bundle_' + this.bundleName) != this.todaysDate) {
      this.apiService.getBundlesList(this.bundleiSO, this.bundleType).then((res: any) => {

        if (res.data.length > 0) {
          this.loadingScreen.dismissLoading();
          this.isLoading =true;
          this.bundleList =  JSON.parse(res.data[0].cache_value).bundles;
          window.localStorage.setItem('bundle_' + this.bundleName, JSON.stringify(this.bundleList));
          window.localStorage.setItem('todays_date_bundle_' + this.bundleName, this.todaysDate);
        } else {
          this.loadingScreen.dismissLoading();
          this.bundleList = [];
          this.isLoading =false;
        }

      }).catch(err => {
        this.loadingScreen.dismissLoading();
        this.isLoading =false;
      })
    } else {
      this.loadingScreen.dismissLoading();
      this.bundleList = window.localStorage.getItem('bundle_' + this.bundleName);
      this.bundleList = JSON.parse(this.bundleList);
    }

  }

  roundNumber(num: number): number {

    if (this.currencyCode != 'USD')
    {
       let commission=  num * this.commissionRate;
      let nums = (num + commission) * this.rate;
      return this.roundToNearestHour(nums);
    }
    else
    {
      let commission=  num * this.commissionRate;
      return this.roundToNearestHour(num + commission);
    }
  }

   roundToNearestHour(number:any) {
    // Split the number into integer and decimal parts
    var integerPart = Math.floor(number);
    var decimalPart = number - integerPart;
  
    // Round the decimal part to the nearest hour
    if (decimalPart >= 0.5) {
      integerPart++;
    }
  
    // Return the result
    return integerPart;
  }

  gotoBack() {
    this.navController.pop();
  }

  gotoSummary(bundleItem: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        currencyCode: this.currencyCode,
        bundleItem: bundleItem,
        withBack: true,
        types: this.bundleType,
        networklogos: this.networkImages,
        iccid: this.iccid
      }
    };
    this.Router.navigate(['/bundle-summary'], navigationExtras);
  }

  //Common Footers
  gotoTab1() {
    if (window.localStorage.getItem("token") == null)
    this.navController.navigateRoot(['bundle']);
    else
    this.navController.navigateRoot(['tab1']);
  }
  gotoTab2() {
    this.navController.navigateRoot(['tab2']);
  }
  gotoTab4() {
    this.navController.navigateRoot(['tab4']);
  }
  gotoTab5() {
    this.navController.navigateRoot(['tab5']);
  }
  //End of common footers
}
