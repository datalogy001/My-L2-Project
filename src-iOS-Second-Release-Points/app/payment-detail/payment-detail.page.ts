import { PaymentModalPage } from '../payment-modal/payment-modal.page';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Platform, NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { ServicesService } from '../api/services.service';
import { Router, NavigationExtras } from '@angular/router';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import Swiper from 'swiper';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';


import { PopoverContentLogoPage } from '../popover-content-logo/popover-content-logo.page';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  tempDetails: any = [];
  paypalObj: any = { 'total_amount': '', 'currency_code': '' };
  browser: any = '';
  successUrl: any = '';
  errorUrl: any = '';
  checkoutObj: any = {'networkLogos' : [], 'networksData': [],'iccid' :'', 'status' : '','user_id': '','id': '', 'actualAmount': '', 'extraAmount': '', 'currency': '', 'bundleData': [], 'paymentId': '', 'PayerID': '', 'token': '' };
  accessToken: any = '';
  userDetails: any = [];
  isLogin: any = '';
  paymentType: any = '';
  card_id: any;
  networkImages: any = [];
  uniquwNetworks: any = [];
  types: any;
  //Static 
  seen: any = '';
  currencyCode: any = 'USD';
  isCardSelected: any = false;
  cardList: any = [];
  selectedCards: boolean[] = [];
  isData: any = true;
  stripe_key: any = this.service.stripePubliserKey;
  iccid:any;
  networks:any=[];
  stripeCardObj: any = { 'customer_id': '', 'card_source': '', 'card_id': '', 'currency': '', 'bundle': '', 'isTermsSelected': false , 'iccid':''};
  paymentMethod: any = [];
  isDataAvail: any = true;
  rate:any;
  commissionRate:any;
  constructor(private popoverController: PopoverController,private loadingScreen: LoadingScreenAppPage, private platform: Platform, private iab: InAppBrowser, private loadCtr: LoadingController, private service: ServicesService, private navController: NavController, private toastController: ToastController, private Router: Router, private modalController: ModalController) {

  }


  swiperSlideChanged(e: any) {
    //console.log('changed: ', e);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }


  ngOnInit() {
    this.paymentMethod = [ { 'type': 2, 'text': 'Credit/Debit', 'img': 'assets/img/credit-card.png' }, { 'type': 3, 'text': 'Google Pay', 'img': 'assets/img/googlepay.png' }, { 'type': 1, 'text': 'Paypal', 'img': 'assets/img/paypal1.png' }];
  }

  ionViewDidEnter() {

  }

  async proceedForPayment() {

    this.Router.navigate(['purchase-success'] );
   }

 

  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }
  gotoTab5() {
    this.navController.navigateRoot('tab5');
  }

  gotoBack()
  {
    this.navController.back();
  }
}


