import { ConfirmContinuePage } from '../confirm-continue/confirm-continue.page';
import { Component, OnInit, Input, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Platform, NavController, AlertController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { ServicesService } from '../api/services.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import Swiper from 'swiper';
import { ProcessingBarFpayPage } from '../processing-bar-fpay/processing-bar-fpay.page';
import { ProcessingBarGooglePayPage } from '../processing-bar-google-pay/processing-bar-google-pay.page';
import { ProcessingBarAppCreaditPage } from '../processing-bar-app-creadit/processing-bar-app-creadit.page';
import { ProcessingBarTlyncPayPage } from '../processing-bar-tlync-pay/processing-bar-tlync-pay.page';
import { loadStripe, Stripe, StripeElements, StripeCardNumberElement, StripeCardExpiryElement, StripeCardCvcElement } from '@stripe/stripe-js';
import { TranslateService } from '@ngx-translate/core';
import { SuccessModelEsimPage } from '../success-model-esim/success-model-esim.page';
import { PermissionModalPage } from '../permission-modal/permission-modal.page';
import { ModalNocreditBalancePage } from '../modal-nocredit-balance/modal-nocredit-balance.page';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { ModalCouponaddedPage } from '../modal-couponadded/modal-couponadded.page';
import { ModalCodenotworkPage } from '../modal-codenotwork/modal-codenotwork.page';
import { DelModelCoupenPage } from '../del-model-coupen/del-model-coupen.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';
import { SplitPaymentPage } from '../split-payment/split-payment.page';
declare var sgap: any;


@Component({
  selector: 'app-payment-days',
  templateUrl: './payment-days.page.html',
  styleUrls: ['./payment-days.page.scss'],
})
export class PaymentDaysPage implements OnInit {

  private stripe: Stripe | null = null;
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  tempDetails: any = [];
  checkoutObj: any = { "is_couped_applied": 0, "currency": "", "original_amount": "", "coupon_code": "", "payment_type": "", "percentage": "", "discount_amount": "", 'networkLogos': [], 'networksData': [], 'iccid': '', 'status': '', 'user_id': '', 'id': '', 'actualAmount': '', 'extraAmount': '', 'bundleData': [], 'paymentId': '', 'PayerID': '', 'token': '' };
  accessToken: any = '';
  userDetails: any = [];
  isLogin: any = '';
  paymentType: any = '';
  card_id: any;
  currencyCode: any = 'USD';
  backURL: any = '';
  selectedCards: boolean[] = [];
  isData: any = true;
  stripe_key: any = this.service.stripePubliserKey;
  iccid: any;
  networks: any = [];
  stripeCardObj: any = { "is_split_payment": false, "total_amount" : "","wallet_amount":"",  "amt_from_other_payment":"","is_couped_applied": 0, "currency": "", "original_amount": "", "coupon_code": "", "payment_type": "", "percentage": "", "discount_amount": "", 'payment_intent': [], 'customer_id': '', 'card_source': '', 'card_id': '', 'bundle': '', 'isTermsSelected': false, 'iccid': '' }; 
  paymentMethod: any = [];
  isDataAvail: any = true;
  clientSecret: any = '';
  paymentIntentObj: any = { 'amount': '', 'currency': '', 'plan': '' };
  cardIntentObj: any = { 'card_id': '', 'intent_id': '' };
  types: any = '';
  dataBrowsing: any = [];
  isConfimeSIM: any = false;
  browsing_amt: any;
  browsing_data: any;
  browsing_music: any;
  browsing_video: any;
  isCardSelected: any = false;
  loading = false;
  creditDebitType: any = '';
  googlePayType: any = '';
  private browserInstance: any;  // To store the reference to the browser
  private backButtonSubscription: any;  // To store the back button subscription
  @ViewChild(IonContent, { static: false }) content?: IonContent;

  constructor(private iab: InAppBrowser,private zone: NgZone,  private keyboard: Keyboard, private alertController: AlertController, private translate: TranslateService, private popoverController: PopoverController, private loadingScreen: LoadingScreenAppPage, private platform: Platform, private loadCtr: LoadingController, private service: ServicesService, private navController: NavController, private toastController: ToastController, private Router: Router, private modalController: ModalController) {

   this.platform.ready().then(() => {
  if ((this.platform.is('android') || this.platform.is('ios')) && typeof sgap !== 'undefined') {
    sgap.setKey(this.service.stripePubliserKey);
  } else {
    console.warn('Stripe plugin not available or running in browser.');
    // Optionally mock stripe behavior or skip
  }
});
  }


  async initStripeFun() {
    this.stripe = await loadStripe(this.service.stripePubliserKey);
    if (!this.stripe) {
      console.error('Stripe failed to initialize');
      return;
    }
  }

  swiperSlideChanged(e: any) {
    //console.log('changed: ', e);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }
  walletBalance: any = 0.00;

  ionViewDidEnter() {

    this.walletBalance = window.localStorage.getItem('L2TraveleSIM_user_wallets');
    this.getCreditCards();
  }

  getWalletClass(): string {
    const balance = parseFloat(this.walletBalance) || 0.00; // Ensure walletBalance is treated as a number

    if (balance < 1) {
      return 'tertiary';
    } else if (balance >= 1 && balance < 10) {
      return 'secondary';
    } else {
      return 'primary';
    }
  }

  cardList: any = [];

  // Function to handle radio button click
  cartOpt(index: number, cardDetails: any) {
    // Reset all selections
    this.selectedCards.fill(false);
    // Set the selected card
    this.isCardSelected = true;
    this.selectedCards[index] = true;
    this.stripeCardObj.card_id = cardDetails.id;
    this.stripeCardObj.customer_id = cardDetails.customer_id;
    this.stripeCardObj.card_source = cardDetails.card_source;
    this.paymentType = '';
    //console.log("::" + this.isCardSelected);
  }

  onCreditDebitTypeChange(event: any) {
    this.creditDebitType = event.detail.value;
    this.googlePayType = '';
  }

  onGooglePayTypeChange(event: any) {
    this.googlePayType = event.detail.value;
    this.selectedCards.fill(false);
    this.isCardSelected = false;
    this.creditDebitType = '';
  }


  async getCreditCards() {
    this.service.getCreditCardDetails(this.accessToken).then((res: any) => {
      if (res.code == 200) {
        if (res.data[0].length > 0) {
          this.cardList = res.data[0];
          this.selectedCards = new Array(this.cardList.length).fill(false);
        }
        else {
          this.cardList = [];
        }
      } else {
        this.cardList = [];
      }
    }).catch(err => {
      this.cardList = [];
    })

  }

  gotoHomeSearch() {
    this.navController.navigateRoot('home-search');
  }
  
  lang: any;

  coupon_code: any = '';

  ngOnInit() {
    this.lang = window.localStorage.getItem("L2TraveleSIM_language") || 'en';

    this.paymentType = '';
    this.loadPaymentMethods();
    this.initStripeFun();
    this.keyboard.onKeyboardWillShow().subscribe(() => {
      setTimeout(() => {
        this.content?.scrollToPoint(0, 300, 300); // Scroll to a specific point
      }, 300);
    });

    this.keyboard.onKeyboardWillHide().subscribe(() => {
      setTimeout(() => {
        this.content?.scrollToBottom(300); // Adjust as needed when keyboard hides
      }, 300);
    });

    this.dataBrowsing = [{ 'dataAmt': '1', 'browsing': '6', 'music': '3', 'video': '2' },
    { 'dataAmt': '2', 'browsing': '12', 'music': '6', 'video': '4' },
    { 'dataAmt': '3', 'browsing': '18', 'music': '9', 'video': '6' },
    { 'dataAmt': '5', 'browsing': '30', 'music': '15', 'video': '10' },
    { 'dataAmt': '10', 'browsing': '60', 'music': '30', 'video': '20' },
    { 'dataAmt': '20', 'browsing': '120', 'music': '60', 'video': '40' },
    { 'dataAmt': '50', 'browsing': '300', 'music': '150', 'video': '100' }];
    this.paymentMethod = [{ 'type': 1, 'text': 'Credit/Debit', 'img': 'assets/img/credit-card.png' }, { 'type': 2, 'text': 'Google Pay', 'img': 'assets/img/googlepay.png' }];
    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.backURL = this.tempDetails.payBack == undefined || this.tempDetails.payBack == '' ? '' : this.tempDetails.payBack;


    this.checkoutObj = this.tempDetails.checkoutData;
    this.checkBrowsingData(this.checkoutObj.bundleData.dataAmount);

    if (this.checkoutObj.types == 'country')
      this.bundleName = this.translate.instant(`COUNTRIES.${this.checkoutObj.bundleData.countries[0]['iso']}`)
    else
      this.bundleName = this.translate.instant(`ZONES.${this.checkoutObj.bundleData.countries[0]['iso']}`)

        ;

    if (window.localStorage.getItem('L2TraveleSIM_currency') == null) {
      this.currencyCode = 'USD';
    } else {
      this.currencyCode = window.localStorage.getItem('L2TraveleSIM_currency');
    }

    if(this.currencyCode == 'LYD')
    {
     this.selectedPaymentType = 'tlync'; //
    }else{
     this.selectedPaymentType = 'google-pay'; // gogole Pay selected by default
    }

    this.stripeCardObj.currency = this.currencyCode;
    this.cashbackObj.currency = this.currencyCode;
    this.cashbackObj.bundle_name = this.checkoutObj.bundleData.name;
    this.cashbackObj.usd_price = this.checkoutObj.bundleData.usd_price;
    this.cashbackObj.country = this.checkoutObj.bundleData.countries[0]['iso'];
    this.coupencodeObj.amount = this.checkoutObj.bundleData.usd_price;
    this.stripeCardObj.bundle = this.checkoutObj;
    this.types = window.localStorage.getItem('L2TraveleSIM_types');
    this.isLogin = this.tempDetails.withOutLogin;
    this.accessToken = window.localStorage.getItem('L2TraveleSIM_auth_token');
    this.userDetails = window.localStorage.getItem('L2TraveleSIM_userDetails');
    this.userDetails = JSON.parse(this.userDetails);
    this.checkoutObj.id = this.userDetails.id;
    this.checkoutObj.user_id = this.userDetails.id;
    this.stripeCardObj.iccid = this.checkoutObj.iccid;
    this.getCashbackDetails();
 
  }

  cashbackObj: any = { 'bundle_name': '', 'usd_price': '', 'currency': '', 'country': '' };
  cashBackRes: any = { "is_cashback_applicable": '', "amount_type": "", "percentage": "", "amount": "", "currency": "" };

  async getCashbackDetails() {
    this.service.getcashBackDetails(this.cashbackObj, this.accessToken).then((res: any) => {
      if (res.code == 200) {
        this.cashBackRes = res.data[0];
      } else {
        this.cashBackRes = this.cashBackRes.is_cashback_applicable = 0;
      }
    }).catch(err => {
      this.cashBackRes = this.cashBackRes.is_cashback_applicable = 0;
    })
  }



  actualPrice:any; 
  
  // Event handler for radio button change
  onPaymentTypeChange(event: any) {
    this.stripeCardObj.is_split_payment =false;
    this.stripeCardObj.total_amount ='';
    this.stripeCardObj.wallet_amount ='';
    this.stripeCardObj.amt_from_other_payment ='';
    
    this.selectedPaymentType = event.detail.value;
    if (this.selectedPaymentType == 'google-pay') {
      this.creditDebitType = '';
      this.isCardSelected = false;
    } else if (this.selectedPaymentType == 'credit-debit') {
      this.isCardSelected = false;
    }
    else if (this.selectedPaymentType == 'wallet-pay') {
      this.creditDebitType = '';
      this.isCardSelected = false;
      }
    }
  

  gotoTOpup() {

    if (this.accessToken != null && this.accessToken != '') {
      this.Router.navigate(['/credit-topup']);
    }
  }

  checkBrowsingData(dataAmount: any) {

    if (this.checkoutObj.isUnlimited == false) {
      const dmt = dataAmount / 1000;
      const result = this.getDataByAmt(dmt);
      this.browsing_amt = dmt;
      this.browsing_data = result.browsing;
      this.browsing_music = result.music;
      this.browsing_video = result.video;
    } else {
      this.browsing_amt = '1';
      this.browsing_data = '6';
      this.browsing_music = '3';
      this.browsing_video = '2';
    }
  }

  getDataByAmt(dataAmt: any) {
    return this.dataBrowsing.find((item: any) => item.dataAmt == dataAmt);
  }

  gotoBack() {
    this.navController.pop();
  }

  async gotoPernissionModel() {
    const modal = await this.modalController.create({
      component: PermissionModalPage,
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data.inputValue == true) {
        let navigationExtras: NavigationExtras = {
          state: {
            stripeCardData: this.stripeCardObj,
            fromPayment: true,
            cashBackRes: this.cashBackRes
          }
        };
        this.Router.navigate(['/add-card-fpay'], navigationExtras);
      } else {

        // Reset all selections and choose first
        this.selectedCards.fill(false);
        // Set the selected card
        this.isCardSelected = true;
        this.selectedCards[0] = true;
        this.stripeCardObj.card_id = this.cardList[0]['id'];
        this.stripeCardObj.customer_id = this.cardList[0]['customer_id'];
        this.stripeCardObj.card_source = this.cardList[0]['card_source'];
        this.paymentType = '';
      }
    });

    return await modal.present();
  }

  selectedPaymentType: string = 'google-pay'; // Set Gogole Pay as the default selected option
  // Load the available payment methods
  loadPaymentMethods() {
    this.paymentMethod = [{ type: 2, text: 'Google Pay', img: 'assets/img/google-pay.png' }];
   
  }

  setupGooglePay(totalAmount: any, currency: any) {
    if (this.platform.is('android') || this.platform.is('ios')) {
      sgap.setKey(this.service.stripePubliserKey);
      sgap.isReadyToPay().then(() => {
        sgap
          .requestPayment(totalAmount.toString(), currency)
          .then((responsePayment: any) => {
            this.managingAppLogs("From App Step 2 Normal eSIM Purchase: Google Pay Native SDK Success: " + JSON.stringify(responsePayment) ,this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
            this.actualStripePaymentGooglrPay(this.clientSecret, responsePayment);
          })
          .catch((errorPayment: any) => {
            this.managingAppLogs("From App Step 2 Normal eSIM Purchase: Google Pay Native SDK Error: " + JSON.stringify(errorPayment) ,this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
            this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('payment_cancelled'));
          });
      }).catch((error: any) => {
        this.managingAppLogs("From App Step 2 Normal eSIM Purchase: Google Pay Native SDK Payment Cancelled : " + JSON.stringify(error) ,this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
        this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('payment_cancelled'));
      });
    } else {

      console.log('We are in the web environment, Google Pay is not available.');
    }
  }

  // Step 3: Actual payment from App
  async actualStripePaymentGooglrPay(client_secret: string, token: string) {
    if (!this.stripe) {
      console.error('Stripe failed to initialize');
      return;
    }

    // Use payment_method_data with the token provided by Google Pay or Apple Pay
    const { error: confirmError, paymentIntent } = await this.stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: {
          token: token, // Correct way to pass the token
        },
      },
    });

    if (confirmError) {
      this.loadingScreen.dismissLoading();
      this.managingAppLogs("From App Step 3 Normal eSIM Purchase: Google Pay confirmation Payment Failed:" + JSON.stringify(confirmError),this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
      this.errorMSGModal(
        this.translate.instant('ERROR_TRY_AGAIN'),
        this.translate.instant('PAYMENT_CONFIRMATION_FAILED')
      );
    } else if (paymentIntent && paymentIntent.status == 'succeeded') {
      this.managingAppLogs("From App Step 3 Normal eSIM Purchase: Google Pay Confirmation Payment Success:" + JSON.stringify(paymentIntent),this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);   
      this.stripeCardObj.payment_intent = paymentIntent;
      this.loadingScreen.dismissLoading();
      const modalFirstOpt = await this.modalController.create({
        component: ProcessingBarGooglePayPage,
        componentProps: { value: this.stripeCardObj, value1: this.accessToken, value2: this.checkoutObj.iccid, value3: this.cashBackRes },
      });
      modalFirstOpt.onDidDismiss();
      return await modalFirstOpt.present();
    }
  }


  //Step 3 : Actual payment from App
  async actualStripePayment(client_secret: any, payment_method: any) {
    if (!this.stripe) {
      console.error('Stripe failed to initialize');
      return;
    }

    const { error: confirmError, paymentIntent } = await this.stripe.confirmCardPayment(client_secret, {
      payment_method: payment_method
    });

    if (confirmError) {
      this.loadingScreen.dismissLoading();
       this.managingAppLogs("From App Step 3 Normal eSIM Purchase: Card Confirmation Payment Failed:" + JSON.stringify(confirmError),this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
      this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('PAYMENT_CONFIRMATION_FAILED'));
    } else if (paymentIntent && paymentIntent.status == 'succeeded') {
      this.stripeCardObj.payment_intent = paymentIntent;
      // For Card selected Credit/debit card 
       this.managingAppLogs("From App Step 3 Normal eSIM Purchase: Card Confirmation Payment Success:" + JSON.stringify(paymentIntent),this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
      this.loadingScreen.dismissLoading();
      const modalFirstOpt = await this.modalController.create({
        component: ProcessingBarFpayPage,
        componentProps: { 'value': this.stripeCardObj, 'value1': this.accessToken, 'value2': this.checkoutObj.iccid, value3: this.cashBackRes }
      });
      modalFirstOpt.onDidDismiss();
      return await modalFirstOpt.present();
      //End code  
    }

  }

  //Calling Split Payment 
 
  tempSplitPaymentsObj:any ={"is_split_payment": false, "total_amount" : "","wallet_amount":"",  "amt_from_other_payment":"","selected_payment_method":"","card_id":"","customer_id":"","card_source":"", "isExistigCard":""};

  async callSplitPayment(actualAmt: any) {
    this.tempSplitPaymentsObj.total_amount = actualAmt;
    this.tempSplitPaymentsObj.wallet_amount = this.walletBalance;
  
    const modalparitalPay = await this.modalController.create({
      component: SplitPaymentPage,
      componentProps: { splitObj: this.tempSplitPaymentsObj }
    });
  
    // ✅ FIRST present the modal
    await modalparitalPay.present();
  
    // ✅ THEN wait for dismissal
    const { data, role } = await modalparitalPay.onDidDismiss();
  
    if (data) {

      console.log("All New Datas" + JSON.stringify(data.splitDatas));

    if(data.isClose == false)
    {
      this.stripeCardObj.is_split_payment = data.splitDatas.is_split_payment;
      this.stripeCardObj.total_amount = data.splitDatas.total_amount;
      this.stripeCardObj.wallet_amount = data.splitDatas.wallet_amount;
      this.stripeCardObj.amt_from_other_payment = data.splitDatas.amt_from_other_payment;
    
      //For Split Google pay functionality 
      if(data.splitDatas.selected_payment_method == 'google-pay')
      {
        //First step: Generate client secret key
        await this.loadingScreen.presentLoading();
        this.paymentIntentObj.currency = this.currencyCode;
        this.paymentIntentObj.amount =this.stripeCardObj.amt_from_other_payment;
        this.paymentIntentObj.plan = this.stripeCardObj.bundle.bundleData.name;
        this.managingAppLogs("From App Step 1 Normal eSIM Purchase: Google Pay- Split Payment Intent Started",this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
        this.service.createPaymentIntent(this.paymentIntentObj, this.accessToken).then((res: any) => {
          if (res.code == 200) {
            this.clientSecret = res.data[0].client_secret;
            this.loadingScreen.dismissLoading();
            this.setupGooglePay(this.paymentIntentObj.amount, this.currencyCode);
          } else {
            this.loadingScreen.dismissLoading();
            this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('ERROR_MESSAGE'));
            this.clientSecret = '';
          }
        }).catch(err => {
          this.loadingScreen.dismissLoading();
          this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('ERROR_MESSAGE'));
          this.clientSecret = '';
        })
      }else{
        console.log("Card payments with Add card");


        if(data.splitDatas.isExistigCard ==false)
        {
        let navigationExtras: NavigationExtras = {
          state: {
            stripeCardData: this.stripeCardObj,
            fromPayment: true,
            cashBackRes: this.cashBackRes
          }
        };
        this.Router.navigate(['/add-card-fpay'], navigationExtras);
      }else
      {
        //Existing card 
        this.stripeCardObj.card_id = data.splitDatas.card_id ;
        this.stripeCardObj.customer_id = data.splitDatas.customer_id;
        this.stripeCardObj.card_source = data.splitDatas.card_source;

        await this.loadingScreen.presentLoading();
        this.stripeCardObj.isTermsSelected = true;
        // Step 1-> Get Client secret key from Server side 
        this.paymentIntentObj.currency = this.currencyCode;
        this.paymentIntentObj.amount = this.stripeCardObj.amt_from_other_payment;
        this.paymentIntentObj.plan = this.stripeCardObj.bundle.bundleData.name;
        this.managingAppLogs("From App Step 1 Normal eSIM Purchase: Card Payment- Split Payment Intent Started",this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
        this.service.createPaymentIntent(this.paymentIntentObj, this.accessToken).then((res: any) => {

          if (res.code == 200) {
            // this.presentToast("Initialize Payment Intent", "Success");
            this.clientSecret = res.data[0].client_secret;
            this.cardIntentObj.card_id = this.stripeCardObj.card_id;
            this.cardIntentObj.intent_id = res.data[0].id;
            this.callPaymentIntentFromApp(this.cardIntentObj);

          } else {
            this.loadingScreen.dismissLoading();
            this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('ERROR_MESSAGE'));
            this.clientSecret = '';
          }
        }).catch(err => {
          this.loadingScreen.dismissLoading();
          this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('ERROR_MESSAGE'));
          this.clientSecret = '';
        })

      }

      }
    }else
    {
      console.log("Close Modal");
    }
    }
  }
  
// Common functions for Logs 
  async managingAppLogs(label: string, currencyCode: string, amount: number, plan: string): Promise<void> {
  let devicePlatform = 'Unknown';

  if (this.platform.is('android')) {
    devicePlatform = 'Android';
  } else if (this.platform.is('ios')) {
    devicePlatform = 'iOS';
  } else if (this.platform.is('desktop')) {
    devicePlatform = 'Desktop';
  } else if (this.platform.is('mobileweb')) {
    devicePlatform = 'Mobile Web';
  }

  const paymentEvent = {
    label,
    data: {
      Action: label,
      Device: devicePlatform,
   Customer_name: `${this.userDetails.first_name}${this.userDetails.last_name ? ' ' + this.userDetails.last_name : ''}`,
      Customer_email: this.userDetails.email,
      Amount: amount,
      Currency: currencyCode,
      Plan: plan
    }
  };

  console.log('Event log:', paymentEvent);

 try {
  const response = await this.service.appSideLogs(paymentEvent, this.accessToken) as { code: number };
  if (response.code === 200) {
    console.log('Logs managed successfully');
  } else {
    console.error('Error managing logs:', response);
  }
} catch (error) {
  console.error('Server error while managing logs:', error);
}
}

// End of Common functions for Logs 

private validatePaymentCurrency(): boolean {

  console.log(this.selectedPaymentType);
  console.log(this.currencyCode);

  // T-Lync → ONLY LD
  if (this.selectedPaymentType === 'tlync' && this.currencyCode !== 'LYD') {
    this.errorMSGModal(
      this.translate.instant('OK_BUTTON'),
      this.translate.instant('TLync_CURRENCY_ERROR_DESC')
    );
    return false;
  }

  // Google Pay & Card → LD NOT allowed
  if (
    (this.selectedPaymentType === 'google-pay' || this.selectedPaymentType === 'credit-debit') &&
    this.currencyCode === 'LYD'
  ) {
    this.errorMSGModal(
      this.translate.instant('OK_BUTTON'),
      this.translate.instant('LD_NOT_SUPPORTED_DESC')
    );
    return false;
  }

  return true;
}



  async proceedForPayment() {

if (!this.validate()) return;

  // ✅ Currency vs payment method validation
  if (!this.validatePaymentCurrency()) return;



      if (this.selectedPaymentType == 'wallet-pay') {
      this.actualPrice= this.stripeCardObj.is_couped_applied == 0 ? this.stripeCardObj.bundle.extraAmount : this.stripeCardObj.original_amount;
      const wallet = Number(this.walletBalance);
      const price = Number(this.actualPrice);
        
        if (wallet === 0) {
          // Case 1: Wallet is 0
          this.gotoNocreditbalance(
            this.translate.instant("you_dont_have_credit"),
            this.translate.instant("you_dont_have_credit_desc"),
            8000
          );
        } else if (wallet >= price) {
          // Case 2: Full payment from wallet
          this.cashBackRes = { "is_cashback_applicable": 0, "amount_type": "", "percentage": "", "amount": "", "currency": "" };
          this.managingAppLogs("From App Step 1 Normal eSIM Purchase: Wallet Pay checkout started: Wallet Amount: " + wallet,this.currencyCode,  price, this.stripeCardObj.bundle.bundleData.name);
          const modalFirstOpt = await this.modalController.create({
          component: ProcessingBarAppCreaditPage,
          componentProps: { value: this.stripeCardObj, value1: this.accessToken, value2: this.checkoutObj.iccid, value3: this.cashBackRes },
        });
        modalFirstOpt.onDidDismiss();
        return await modalFirstOpt.present();
        } else {
          // Case 3: Partial wallet, needs split payment
          await this.loadingScreen.presentLoading();
          setTimeout(() => {
            this.loadingScreen.dismissLoading();
            this.callSplitPayment(this.actualPrice);
          }, 500);
        }
      }
      else if (this.selectedPaymentType == 'google-pay') {
 
        //First step: Generate client secret key
        console.log("Google Pay" + JSON.stringify(this.stripeCardObj));
        await this.loadingScreen.presentLoading();
        this.paymentIntentObj.currency = this.currencyCode;
        this.paymentIntentObj.amount = this.stripeCardObj.is_couped_applied == 0 ? this.stripeCardObj.bundle.extraAmount : this.stripeCardObj.original_amount;
        this.paymentIntentObj.plan = this.stripeCardObj.bundle.bundleData.name;
        this.managingAppLogs("From App Step 1 Normal eSIM Purchase: Google Pay Intent Started",this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
        this.service.createPaymentIntent(this.paymentIntentObj, this.accessToken).then((res: any) => {
          if (res.code == 200) {
            this.clientSecret = res.data[0].client_secret;
            this.loadingScreen.dismissLoading();
            this.setupGooglePay(this.paymentIntentObj.amount, this.currencyCode);
          } else {
            this.loadingScreen.dismissLoading();
            this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('ERROR_MESSAGE'));
            this.clientSecret = '';
          }
        }).catch(err => {
          this.loadingScreen.dismissLoading();
          this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('ERROR_MESSAGE'));
          this.clientSecret = '';
        })
  
      } 
       else if (this.selectedPaymentType == 'tlync') {
        this.tlyncPaymentIntegration();
      }
      else {
        if (this.cardList.length > 0 && this.isCardSelected == false) {
          this.gotoPernissionModel();
        }
        else {
          if (this.isCardSelected == true) {

            await this.loadingScreen.presentLoading();
            this.stripeCardObj.isTermsSelected = true;
            // Step 1-> Get Client secret key from Server side 
            this.paymentIntentObj.currency = this.currencyCode;
            this.paymentIntentObj.amount = this.stripeCardObj.is_couped_applied == 0 ? this.stripeCardObj.bundle.extraAmount : this.stripeCardObj.original_amount;
            this.paymentIntentObj.plan = this.stripeCardObj.bundle.bundleData.name;
            this.managingAppLogs("From App Step 1 Normal eSIM Purchase: Card Intent Started",this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
            this.service.createPaymentIntent(this.paymentIntentObj, this.accessToken).then((res: any) => {
              if (res.code == 200) {
                // this.presentToast("Initialize Payment Intent", "Success");
                this.clientSecret = res.data[0].client_secret;
                this.cardIntentObj.card_id = this.stripeCardObj.card_id;
                this.cardIntentObj.intent_id = res.data[0].id;
                this.callPaymentIntentFromApp(this.cardIntentObj);

              } else {
                this.loadingScreen.dismissLoading();
                this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('ERROR_MESSAGE'));
                this.clientSecret = '';
              }
            }).catch(err => {
              this.loadingScreen.dismissLoading();
              this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('ERROR_MESSAGE'));
              this.clientSecret = '';
            })


          }
          else {

            console.log(this.stripeCardObj.is_couped_applied);

            let navigationExtras: NavigationExtras = {
              state: {
                stripeCardData: this.stripeCardObj,
                fromPayment: true,
                cashBackRes: this.cashBackRes
              }
            };
            this.Router.navigate(['/add-card-fpay'], navigationExtras);
          }
        }
      }
    
  }

  //Step: 1 for tylnc payment Started 
  res:any;
  paymentURL:any;
  custom_ref:any;
  private async tlyncPaymentIntegration() {
      // Card Payment via in-app browser
        try {
          // Step 1: Show loading screen
           console.log("ltync-pay-init-checkout" + JSON.stringify(this.stripeCardObj));
          await this.loadingScreen.presentLoading();
          this.managingAppLogs("From App Step 1 Normal eSIM Purchase: Card Intent Started for ltync payment",this.currencyCode,  this.stripeCardObj.bundle.extraAmount, this.stripeCardObj.bundle.bundleData.name);
          //Amount need to be check for coupon 
          this.res = await this.service.createInitPaymenttlync(this.stripeCardObj, this.accessToken);
        
          if (this.res.code == "OK") {
            this.loadingScreen.dismissLoading();
         
            this.paymentURL = this.res.data['url'];
            this.custom_ref = this.res.data['custom_ref'];
            
            // Open in-app browser
          const approvalUrl =this.paymentURL ;
            const target = '_blank'; 
            const options: InAppBrowserOptions = {
              location: 'no',
              clearcache: 'yes',
              clearsessioncache: 'yes',
              hardwareback: 'no' // Disable hardware back button in the browser
            };
            // Open the InAppBrowser and store the reference
            const browser = this.iab.create(approvalUrl, target, options);
        
              // Prevent back button from closing the entire app
            this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
              if (browser) {
                browser.close(); // Close the in-app browser
              }
            });
        
            // Debugging all browser events
            browser.on('loadstart').subscribe(event => {
              //console.log("Loadstart event fired! URL:", event.url);
            });
        
            browser.on('loadstop').subscribe(event => {
              this.zone.run(() => {
                if (event && event.url && event.url.includes(this.custom_ref)) {
                            setTimeout(() => {
                browser.close();
                this.getSuccessfromtlync(this.custom_ref);
            }, 15000);
                } 
            
              });
            });
        
            // Handle load errors
            browser.on('loaderror').subscribe(event => {
              console.log("Loaderror event fired! URL:", event.url);
           //   alert("Loaderror event fired!");
            });
        
            // Handle browser exit
            browser.on('exit').subscribe(() => {
              console.log('Browser exited.');
              if (this.backButtonSubscription) {
                this.backButtonSubscription.unsubscribe(); // Unsubscribe from back button
              }
            });
        
            // Show the browser
            browser.show(); 

          } else {
            this.loadingScreen.dismissLoading();
            // Handle API error
          }
        } catch (error) {
          this.loadingScreen.dismissLoading();
          console.error('Error initiating payment:', error);
        }
  }

  // Card pay success
async getSuccessfromtlync(order_id: any) {
  try {
    this.managingAppLogs("From App Step 2 eSIM Purchase: After Successful Payment Callback EntryPoints tlync" + JSON.stringify(order_id),this.currencyCode,  this.stripeCardObj.bundle.extraAmount, this.stripeCardObj.bundle.bundleData.name);
      this.stripeCardObj.order_id = order_id;
      this.loadingScreen.dismissLoading();
      const modalFirstOpt = await this.modalController.create({
        component: ProcessingBarTlyncPayPage,
        componentProps: { value: this.stripeCardObj, value1: this.accessToken, value2: this.checkoutObj.iccid, value3: this.cashBackRes },
      });
      modalFirstOpt.onDidDismiss();
      return await modalFirstOpt.present();

  } catch (error) {
    // Catch invalid URL or unexpected errors
    this.managingAppLogs("From App Step 2  eSIM Purchase: After Successful Payment Callback Error tlync "+JSON.stringify(error),this.currencyCode,  this.stripeCardObj.bundle.extraAmount, this.stripeCardObj.bundle.bundleData.name);
    this.errorMSGModal(
      this.translate.instant('ERROR_TRY_AGAIN'),
      this.translate.instant('PAYMENT_CONFIRMATION_FAILED')
    );
    console.error('Error parsing entryPoints URL:', error);
  }

}

  //Step 2 : Send Intent and card Id to server 
  async callPaymentIntentFromApp(paymentObj: any) {

    this.managingAppLogs("From App Step 2 Normal eSIM Purchase: Payment Intent Started",this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);

    this.service.paymentCardIntent(paymentObj, this.accessToken).then((res: any) => {
      if (res.code == 200) {
        this.actualStripePayment(this.clientSecret, res.data[0].payment_method);
      } else {
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
      this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('UNABLE_CREATE_INTENT'));
    })
  }



  //Validation start
  validate() {

    // Inside the validate() method
    /*if (this.creditDebitType == '') {
      this.errorMSGModal(this.translate.instant("ERROR_MODAL_BUTTON_TEXT"), this.translate.instant("PLEASE_SELECT_PAYMENT_METHOD"));
      return false;
    } */

    /*if (this.googlePayType == 'google-pay') {
      this.errorMSGModal(this.translate.instant("ERROR_MODAL_BUTTON_TEXT"),this.translate.instant("GOOGLE_PAY_NOT_AVAILABLE"));
      return false;
    } */

    if (this.isConfimeSIM == false) {
      /*if (this.selectedLang == 'ru')
        this.successMSGESIMModal(this.translate.instant("CONFIRM_ESIM_REQUIRED"), this.translate.instant("SUCCESS_MODAL_MESSAGE"), this.translate.instant("SUCCESS_MODAL_TIMEOUT"));
      else */
      this.successMSGModal(this.translate.instant("CONFIRM_ESIM_REQUIRED"), this.translate.instant("SUCCESS_MODAL_MESSAGE"), this.translate.instant("SUCCESS_MODAL_TIMEOUT"));
      return false;
    }


    return true;
  }

  bundleName: any;



  // Inside the successMSGModal() method
  async successMSGESIMModal(buttonText: any, msg: any, times: any) {
    const modal = await this.modalController.create({
      component: SuccessModelEsimPage,
      componentProps: { 'value': msg, 'value1': buttonText, 'value2': times }
    });

    modal.onDidDismiss();
    return await modal.present();
  }


  selectedLang: any;

  gotoMarketPlace() {
    this.navController.navigateRoot('marketplace');
  }


  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }
  gotoTab5() {
    if (window.localStorage.getItem('L2TraveleSIM_auth_token') == null || window.localStorage.getItem('L2TraveleSIM_auth_token') == '')
      this.navController.navigateRoot('tab5');
    else
      this.navController.navigateRoot('profile');
  }

  //Error Modal
  async errorMSGModal(buttonText: any, msg: any) {
    const modal = await this.modalController.create({
      component: PasswordErrorPage,
      componentProps: { 'value': msg, 'value1': buttonText }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

   //Error Modal
  async errorCurrencyMSGModal(buttonText: any, msg: any) {
    const modal = await this.modalController.create({
      component: PasswordErrorPage,
      componentProps: { 'value': msg, 'value1': buttonText }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  


  //Success Modal
  async successMSGModal(buttonText: any, msg: any, times: any) {
    const modal = await this.modalController.create({
      component: SuccessModelPage,
      componentProps: { 'value': msg, 'value1': buttonText, 'value2': times }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  async gotoeSIMComp() {
    this.Router.navigate(['compatible-device']);
  }

  async gotoNocreditbalance(buttonText: any, msg: any, times: any) {
    const modal = await this.modalController.create({
      component: ModalNocreditBalancePage,
      componentProps: { 'value': buttonText, 'value1': msg, 'value2': times }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  async coupenCodeSuccessModel(amount: any, msg: any) {
    const modal = await this.modalController.create({
      component: ModalCouponaddedPage,
      componentProps: { 'value': amount, 'value1': msg }
    });

    modal.onDidDismiss();
    return await modal.present();
  }


  coupencodeObj: any = { "coupon_code": "", "currency": "", "amount": "" };
  coupencodeRes: any = { "is_couped_applied": "", "currency": "", "original_amount": "", "coupon_code": "", "payment_type": "", "percentage": "", "discount_amount": "" };

  async removeCoupon() {
    const modal = await this.modalController.create({
      component: DelModelCoupenPage,
      componentProps: {
        coupon: this.coupon_code // Passing the coupon to the modal
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Modal Response:', result.data);
        if (result.data.action === 'YES') {

          this.coupon_code = "";
          this.coupencodeRes = { "is_couped_applied": 0, "currency": "", "original_amount": "", "coupon_code": "", "payment_type": "", "percentage": "", "discount_amount": "" };
          //Assign parameters 
          this.checkoutObj.is_couped_applied = 0;
          this.checkoutObj.original_amount = "";
          this.checkoutObj.coupon_code = "";
          this.checkoutObj.payment_type = "";
          this.checkoutObj.percentage = "";
          this.checkoutObj.discount_amount = "";
          this.stripeCardObj.is_couped_applied = 0;
          this.stripeCardObj.original_amount = "";
          this.stripeCardObj.coupon_code = "";
          this.stripeCardObj.payment_type = "";
          this.stripeCardObj.percentage = "";
          this.stripeCardObj.discount_amount = "";
          //End 
        } else if (result.data.action === 'NO') {
          console.log('No actions required"');
        }
      }
    });

    return await modal.present();
  }

  async applyCoupon() {
    if (this.validateCoupen()) {

      await this.loadingScreen.presentLoading();
      this.coupencodeObj.coupon_code = this.coupon_code;
      this.coupencodeObj.currency = this.currencyCode;
      
      this.service.applyCoupenCode(this.coupencodeObj, this.accessToken).then((res: any) => {

        if (res.code == 200) {

          this.coupencodeRes = res.data[0];
          this.loadingScreen.dismissLoading();
          //Assign parameters 
          this.checkoutObj.is_couped_applied = this.coupencodeRes.is_couped_applied;
          this.checkoutObj.currency = this.coupencodeRes.currency;
          this.checkoutObj.original_amount = this.coupencodeRes.original_amount;
          this.checkoutObj.payment_type = this.coupencodeRes.payment_type;
          this.checkoutObj.percentage = this.coupencodeRes.percentage;
          this.checkoutObj.discount_amount = this.coupencodeRes.discount_amount;
          this.checkoutObj.coupon_code = this.coupencodeRes.coupon_code;

          this.stripeCardObj.is_couped_applied = this.coupencodeRes.is_couped_applied;
          this.stripeCardObj.currency = this.coupencodeRes.currency;
          this.stripeCardObj.original_amount = this.coupencodeRes.original_amount;
          this.stripeCardObj.payment_type = this.coupencodeRes.payment_type;
          this.stripeCardObj.percentage = this.coupencodeRes.percentage;
          this.stripeCardObj.coupon_code = this.coupencodeRes.coupon_code;
          this.stripeCardObj.discount_amount = this.coupencodeRes.discount_amount;

          console.log(this.stripeCardObj.is_couped_applied);

          if (this.coupencodeRes.payment_type == 'percentage') {
            this.translate.get('COUPON_SUCCESS_FIXED', { percentage: this.coupencodeRes.percentage }).subscribe((translatedMsg: string) => {
              console.log(translatedMsg);
              this.coupenCodeSuccessModel(this.coupencodeRes.discount_amount, translatedMsg);
            });
          } else {
            this.coupenCodeSuccessModel(this.coupencodeRes.discount_amount, this.translate.instant('COUPON_SUCCESS_AMOUNT'))
          }

        } else {
          this.loadingScreen.dismissLoading();
          this.coupon_code = '';
          this.coupencodeRes = { "is_couped_applied": 0, "currency": "", "original_amount": "", "coupon_code": "", "payment_type": "", "percentage": "", "discount_amount": "" };
          this.loadingScreen.dismissLoading();
          this.errorMSGModalCoupen(this.translate.instant('INVALID_COUPON_MESSAGE'), this.translate.instant('CONTINUE'));
        }
      }).catch(err => {
        this.coupon_code = '';
        this.loadingScreen.dismissLoading();
        this.coupencodeRes = { "is_couped_applied": 0, "currency": "", "original_amount": "", "coupon_code": "", "payment_type": "", "percentage": "", "discount_amount": "" };
        this.errorMSGModalCoupen(this.translate.instant('INVALID_COUPON_MESSAGE'), this.translate.instant('CONTINUE'));
      })

    }

  }


  // Validation function for form fields
  validateCoupen() {
    if (this.coupon_code.trim() == '') {
      this.errorMSGModal(this.translate.instant('OK_BUTTON'), this.translate.instant('COUPON_REQUIRED_MESSAGE'));
      return false;
    }
    return true;
  }

  // Display error message modal
  async errorMSGModalCoupen(header: string, message: string) {
    const modal = await this.modalController.create({
      component: ModalCodenotworkPage,
      componentProps: {
        'value': header,
        'value1': message,
      }
    });
    await modal.present();
  }
}
