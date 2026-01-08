import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../api/services.service';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  tempArr: any = [];
  isLogin: any = '';
  token: any = '';
  paymentList: any = [];
  isDataAvail: any = true;
  isDeletedObj: any = { 'user_id': '' };
  userDetails: any = [];
  authToken: any;


  constructor(private translate: TranslateService,private platform: Platform, private loadingScreen: LoadingScreenAppPage, private toastController: ToastController, public alertController: AlertController, private service: ServicesService, private loadCtr: LoadingController, private navCtrl: NavController, private Router: Router) {
    this.paymentList = [];
  }


  convertintoCountryLang(countryName:any)
  {
  // Convert countryName to uppercase
  const upperCaseCountryName = countryName.toUpperCase();
  // Use the uppercase countryName in the translation key
  return this.translate.instant(`COUNTRIES.${upperCaseCountryName}`);
  }

  convertintoZoneLang(zones:any)
  {
    return this.translate.instant(`ZONES.${zones}`) 
  }
  
  ionViewDidEnter() {
    this.paymentList = [];
    if (window.localStorage.getItem('L2TraveleSIM_auth_token') == null) {
      this.isLogin = false;
      this.isDataAvail = false;
    }
    else {
      this.isLogin = true;
      this.token = window.localStorage.getItem('L2TraveleSIM_auth_token');
      this.gotoPaymentHistory();
    }
  }

  handleRefresh(event: any) {
    if (window.localStorage.getItem('L2TraveleSIM_auth_token') == null) {
      this.isLogin = false;
      event.target.complete();
    }
    else {
      this.isLogin = true;
      this.isDataAvail = true;
      this.paymentList = [];
      this.token = window.localStorage.getItem('L2TraveleSIM_auth_token');
      this.gotoPaymentHistory();
      event.target.complete();
    }
  }

  datefilter(dates: any) {
    return moment(dates, 'DD/MM/YYYY').format('DD/MM/YYYY');
  }

  async gotoPaymentHistory() {
    await this.loadingScreen.presentLoading();
    this.service.getPaymentHistory(this.token).then((res: any) => {
      this.loadingScreen.dismissLoading();
      if (res.code == 200) {
        if (res.data.length > 0) {
          this.isDataAvail = true;
          this.paymentList = res.data;
        }
        else {
          this.isDataAvail = false;
          this.paymentList = [];
        }
      } else {
        this.isDataAvail = false;
        this.paymentList = [];
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
    })

  }
  


  ngOnInit() {
    this.paymentList = [];
  }

  getCountryName(inputString1: any) {
    var stringArray = inputString1.split(', ');
    return stringArray[3];
  }

  gotoBack() {
    this.navCtrl.back();
  }

  gotoMarketPlace()
  {
    this.navCtrl.navigateRoot('marketplace');
  }

  gotoTab1() {
    this.navCtrl.navigateRoot('tab1');
  }
  gotoTab5() {
    if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
      this.navCtrl.navigateRoot(['tab5']);
      else
      this.navCtrl.navigateRoot(['profile']);
      
  }

  gotoHomeSearch() {
    this.navCtrl.navigateRoot('home-search');
  }
}