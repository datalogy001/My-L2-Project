import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { ChangeDetectorRef } from '@angular/core';
import { PasswordErrorPage } from '../password-error/password-error.page';

@Component({
  selector: 'app-credit-topup',
  templateUrl: './credit-topup.page.html',
  styleUrls: ['./credit-topup.page.scss'],
})
export class CreditTopupPage implements OnInit {

  currencyCode: any = 'USD';
  selectedAmount: any = null;
  customAmount: any = null;
  lang: any;

  topupAMTList: any[] = [];
  topupAMTNewList: any[] = [];

  // RADIO AMOUNTS
  topupAmounts: any = {

    // Old currencies
    USD: [5, 10, 20],
    EUR: [5, 10, 20],
    GBP: [5, 10, 20],
    LYD: [5, 10, 20],

    // New currencies
    SAR: [20, 40, 80],
    AED: [20, 40, 80],
    TND: [15, 30, 55],
    MAD: [45, 90, 170],
    EGP: [225, 450, 900],
    KWD: [5, 10, 20]

  };

  // DROPDOWN CONFIG
  currencyConfig: any = {

    // Old currencies logic
    USD: { min: 1, max: 50, step: 1 },
    EUR: { min: 1, max: 50, step: 1 },
    GBP: { min: 1, max: 50, step: 1 },

    // LYD old logic
    LYD: { min: 20, max: 1000, step: 10 },

    // New currencies
    SAR: { min: 5, max: 180, step: 5 },
    AED: { min: 5, max: 175, step: 5 },
    TND: { min: 5, max: 135, step: 5 },
    MAD: { min: 10, max: 430, step: 10 },
    EGP: { min: 45, max: 2250, step: 45 },
    KWD: { min: 1, max: 50, step: 1 }

  };

  topupAMTObj: any = {
    status: '',
    amount: '',
    currency: '',
    paymentId: '',
    PayerID: '',
    token: '',
    payment_method: '',
    payment_intent: ''
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private loadingScreen: LoadingScreenAppPage,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private service: ServicesService,
    private Router: Router,
    private modalController: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {

    this.lang = window.localStorage.getItem("L2TraveleSIM_language") || 'en';

    const storedCurrency = window.localStorage.getItem("L2TraveleSIM_currency");

    this.currencyCode = storedCurrency ? storedCurrency : 'USD';

    this.topupAMTObj.currency = this.currencyCode;

    this.generateTopupAmountList(this.currencyCode);

  }

  // -----------------------------
  // Generate Amount List
  // -----------------------------
  generateTopupAmountList(currency: string) {

    this.topupAMTList = [];
    this.topupAMTNewList = [];

    // RADIO BUTTONS
    if (this.topupAmounts[currency]) {

      this.topupAMTList = this.topupAmounts[currency].map((amt: number) => {

        return {
          text: amt.toString(),
          value: amt
        };

      });

    }

    // DROPDOWN OPTIONS
    const config = this.currencyConfig[currency];

    if (config) {

      for (let i = config.min; i <= config.max; i += config.step) {

        this.topupAMTNewList.push({
          text: i.toString(),
          value: i
        });

      }

    }

  }

  // -----------------------------
  // Radio selected
  // -----------------------------
  onRadioSelect(event: any) {

    this.selectedAmount = event.detail.value;
    this.customAmount = null;

  }

  // -----------------------------
  // Dropdown selected
  // -----------------------------
  onDropdownSelect() {

    this.selectedAmount = null;

  }

  // -----------------------------
  // Submit
  // -----------------------------
  submit() {

    const amount = this.selectedAmount ?? this.customAmount;

    if (!amount) {

      this.errorMSGModal(
        this.translate.instant('VALIDATION_MSG_BUTTON'),
        this.translate.instant('SELECT_VALID_AMOUNT')
      );

      return;

    }

    this.topupAMTObj.amount = amount;

    const navigationExtras: NavigationExtras = {
      state: {
        topupAMTData: this.topupAMTObj,
      }
    };

    this.Router.navigate(['/payment-topup'], navigationExtras);

  }

  // -----------------------------
  // Error Modal
  // -----------------------------
  async errorMSGModal(buttonText: any, msg: any) {

    const modal = await this.modalController.create({

      component: PasswordErrorPage,

      componentProps: {
        value: msg,
        value1: buttonText
      }

    });

    await modal.present();

  }

  // -----------------------------
  // Navigation
  // -----------------------------
  gotoBack() {
    this.navCtrl.pop();
  }

  gotoMarketPlace() {
    this.navCtrl.navigateRoot('marketplace');
  }

  gotoTab1() {
    this.navCtrl.navigateRoot('tab1');
  }

}