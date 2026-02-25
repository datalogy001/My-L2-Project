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

  topupAMTList: any = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '20', value: 20 }
  ];

  topupAMTNewList: any[] = [];

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

    // Get currency from localStorage
    const storedCurrency = window.localStorage.getItem("L2TraveleSIM_currency");
    this.currencyCode = storedCurrency ? storedCurrency : 'USD';

    this.topupAMTObj.currency = this.currencyCode;

    this.generateTopupAmountList(this.currencyCode);

    // Default LYD slider value
    if (this.currencyCode === 'LYD') {
      this.customAmount = "";
    }
  }

  // Generate dropdown list
  generateTopupAmountList(currency: string) {

    const startValue = currency === 'LYD' ? 5 : 1;
    const endValue = 50;

    this.topupAMTNewList = Array.from(
      { length: endValue - startValue + 1 },
      (_, i) => {
        const value = startValue + i;
        return {
          text: value.toString(),
          value: value
        };
      }
    );
  }

  // Radio selected
  onRadioSelect(event: any) {
    this.selectedAmount = event.detail.value;
    this.customAmount = null; // Clear range/input
  }

  // Dropdown for other currencies
  onChooseRadio() {
    const value = Number(this.customAmount);
    this.selectedAmount = null;

    if (isNaN(value) || value < 1 || value > 50) {
      this.customAmount = null;
    }
  }

  // LYD Range change
  onLydAmountChange(event: any) {
    this.customAmount = event.detail.value;
    this.selectedAmount = null; // Clear radio
  }

  // LYD manual input validation (NO MODAL HERE)
  validateLydAmount() {

    if (!this.customAmount) return;

    const amount = Number(this.customAmount);

    this.selectedAmount = null;

    // Do NOT show modal here
    // Final validation happens in submit()
  }

  // Submit
  submit() {

    const amount = this.selectedAmount ?? this.customAmount;

    if (!amount) {
      this.errorMSGModal(
        this.translate.instant('VALIDATION_MSG_BUTTON'),
        this.translate.instant('SELECT_VALID_AMOUNT')
      );
      return;
    }

    // Special LYD validation
    if (this.currencyCode === 'LYD') {

      // If radio selected → allow (5, 10, 20)
      if (this.selectedAmount !== null && this.selectedAmount !== undefined) {
        this.topupAMTObj.amount = this.selectedAmount;
      } 
      else {
        const custom = Number(this.customAmount);

        if (isNaN(custom) || custom < 20 || custom > 1000) {
          this.showLydValidationError();
          return;
        }

        this.topupAMTObj.amount = custom;
      }

    } else {
      this.topupAMTObj.amount = amount;
    }

    const navigationExtras: NavigationExtras = {
      state: {
        topupAMTData: this.topupAMTObj,
      }
    };

    this.Router.navigate(['/payment-topup'], navigationExtras);
  }

  // LYD error modal
  showLydValidationError() {
    this.errorMSGModal(
      this.translate.instant('VALIDATION_MSG_BUTTON'),
      this.translate.instant('LYD_INVALID_AMOUNT')
    );
  }

  // Error Modal
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

  // Navigation
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