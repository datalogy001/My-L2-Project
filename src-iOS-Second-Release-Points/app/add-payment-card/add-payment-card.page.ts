import { NavController, ModalController, ToastController, LoadingController, PopoverController } from "@ionic/angular";
import { ServicesService } from '../api/services.service';
import * as moment from 'moment';
import { loadStripe, Stripe, StripeElements, StripeCardNumberElement, StripeCardExpiryElement, StripeCardCvcElement } from '@stripe/stripe-js';
import { Router, NavigationExtras } from '@angular/router';
import { ProcessingBarPage } from '../processing-bar/processing-bar.page';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import Swiper from 'swiper';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-payment-card',
  templateUrl: './add-payment-card.page.html',
  styleUrls: ['./add-payment-card.page.scss'],
})
export class AddPaymentCardPage implements OnInit {
  tempDetails: any = [];
  stripeCardObj: any = { 'customer_id': '', 'card_source': '', 'card_id': '', 'currency': '', 'bundle': '', 'isTermsSelected': false, 'iccid': '' };
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardNumber: StripeCardNumberElement | null = null;
  private cardExpiry: StripeCardExpiryElement | null = null;
  private cardCvc: StripeCardCvcElement | null = null;

  clientSecret: any = '';
  paymentIntentObj: any = { 'amount': '', 'currency': '', 'plan': '' };
  cardIntentObj: any = { 'card_id': '', 'intent_id': '' };
  selectedCards: boolean[] = [];
  stripe_key: any = this.service.stripePubliserKey;
  isCardSelected: any = false;
  cardDetails: any = {};
  creditCardObj: any = {
    'card_intent': '', 'cardNumber': '', 'cardHolder': '', 'expirationDate': '', 'cvv': '', 'isTermsSelected': false,
    'billing_first_name': '', 'billing_last_name': '', 'billing_address': '', 'billing_address2': '',
    'billing_postcode': '', 'billing_city': '', 'billing_country': ''
  };

  paramForDB: any = {
    'token_id': '', 'last4': '', 'expireMonth': '', 'expireYear': '', 'card_intent': '', 'card_holder_name': '',
    'billing_first_name': '', 'billing_last_name': '', 'billing_address': '', 'billing_address2': '',
    'billing_postcode': '', 'billing_city': '', 'billing_country': '', 'isTermsSelected': false,
  };

  tempUserData:any=[]; 
  successToken: any = {};
  addCardObj: any = {
    'last4': '',
    'brand': '',
    'billing_first_name': '',
    'billing_last_name': '',
    'billing_address': '',
    'billing_address2': '',
    'billing_postcode': '',
    'billing_city': '',
    'billing_country': '',
    'token_id': ''
  }

  token: any = '';
  cardList = [];

  constructor(private translate: TranslateService,private loadingScreen: LoadingScreenAppPage, private Router: Router, private popoverController: PopoverController, private service: ServicesService, private loadCtr: LoadingController, private navController: NavController, private modalController: ModalController, private toastController: ToastController) {
    this.tempDetails=[];
    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    if (this.tempDetails.fromPayment == true) {
     // this.getCreditCards();
      this.stripeCardObj.bundle = this.tempDetails.stripeCardData.bundle;
      this.stripeCardObj.currency = this.tempDetails.stripeCardData.currency;
      this.stripeCardObj.iccid = this.tempDetails.stripeCardData.bundle.iccid;
      // Step 1-> Get Client secret key from Server side 
      this.paymentIntentObj.currency = this.stripeCardObj.currency;
      this.paymentIntentObj.amount = this.stripeCardObj.bundle.extraAmount;
      this.paymentIntentObj.plan = this.stripeCardObj.bundle.bundleData.name;

    }else{
      this.creditCardObj.isTermsSelected =true;
    }

   
  }

  cartOpt(index: number, cardDetails: any) {
    // Reset all selections
    this.selectedCards.fill(false);
    // Set the selected card
    this.isCardSelected = true;
    this.selectedCards[index] = true;
    this.stripeCardObj.card_id = cardDetails.id;
    this.stripeCardObj.customer_id = cardDetails.customer_id;
    this.stripeCardObj.card_source = cardDetails.card_source;
    //console.log("::" + this.isCardSelected);
  }


  async getCreditCards() {
    await this.loadingScreen.presentLoading();
    this.service.getCreditCardDetails(this.token).then((res: any) => {
      this.loadingScreen.dismissLoading();
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
      this.loadingScreen.dismissLoading();
      this.cardList = [];
    })
  }
  
  swiperSlideChanged(e: any) {
    //console.log('changed: ', e);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }


  async ngOnInit() {

    this.tempUserData = window.localStorage.getItem('L2TraveleSIM_userDetails');

    if(window.localStorage.getItem('L2TraveleSIM_isSavedDetails') != null || window.localStorage.getItem('L2TraveleSIM_isSavedDetails') != '')
      {
        this.creditCardObj.cardHolder = this.tempUserData.first_name;
        this.paramForDB.card_holder_name = this.tempUserData.first_name;
      }

    this.token = window.localStorage.getItem("L2TraveleSIM_auth_token");
    this.stripe = await loadStripe(this.service.stripePubliserKey);
    if (!this.stripe) {
      console.error('Stripe failed to initialize');
      return;
    }
    const style = {
      base: {
        color: '#ffffff',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '300',
         opacity: '0.8',
        '::placeholder': {
          color: '#ffffff',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '300',
          opacity: '0.8'
        }
      }
    };
    this.elements = this.stripe.elements();
  // Create and mount the Card Number Element
  this.creditCardObj.cardNumber = this.elements.create('cardNumber', { style });
  if (this.creditCardObj.cardNumber) {
    this.creditCardObj.cardNumber.mount('#card-number-element');
  }

  // Create and mount the Card Expiry Element
  this.creditCardObj.expirationDate = this.elements.create('cardExpiry', { style });
  if (this.creditCardObj.expirationDate) {
    this.creditCardObj.expirationDate.mount('#card-expiry-element');
  }

  // Create and mount the Card CVC Element
  this.creditCardObj.cvv = this.elements.create('cardCvc', { style });
  if (this.creditCardObj.cvv) {
    this.creditCardObj.cvv.mount('#card-cvc-element');
  }
    this.createCardIntentService();
  }

  //Get Secret key 
  createCardIntentService() {
    //Service Add Card to get client secret
    this.service.createAddCardIntent(this.token).then((res: any) => {
      if (res.code == 200) {
        this.clientSecret = res.data.client_secret;
      } else {
        this.clientSecret = '';
      }
    }).catch(err => {
      console.error('Failed to create payment intent', err);
      this.clientSecret = '';
    });
    //Service End 
  }


//Goto Submit 
  async gotoSubmit() {

    if (this.validate()) {
      if (!this.stripe || !this.creditCardObj.cardNumber) {
        return;
      }
      await this.loadingScreen.presentLoading();
     // this.successMSGModal("Processing your request to create a secure token for transactions.","Generating Token", "1000");
      const { setupIntent, error } = await this.stripe.confirmCardSetup(
        this.clientSecret, {
        payment_method: {
          card: this.creditCardObj.cardNumber,
          billing_details: {
            name: this.creditCardObj.cardHolder
          },
        },
      }
      );

      if (error) {
        // Handle error
        this.loadingScreen.dismissLoading();
        this.errorMSGModal(this.translate.instant('OK_BUTTON'),error.message);
      } else if (setupIntent) {
        // Handle successful setup
        this.submitCardtoDB(setupIntent);
      }
    }
  }
 
  async submitCardtoDB(cardIntent: any) {

    if (!this.stripe) {
      return;
    }
    const { token, error } = await this.stripe.createToken(this.creditCardObj.cardNumber);

    if (error) {
     
      this.errorMSGModal( this.translate.instant('OK_BUTTON'),error.message);
    } else {
      //  Calling service to insert it into DB 
      this.paramForDB.last4 = token.card?.last4;
      this.paramForDB.expireMonth = token.card?.exp_month;
      this.paramForDB.expireYear = token.card?.exp_year;
      this.paramForDB.brand = token.card?.brand;
      this.paramForDB.token_id = token.id;
      this.paramForDB.card_holder_name = this.creditCardObj.cardHolder;
      this.paramForDB.billing_first_name = this.creditCardObj.cardHolder;
      this.paramForDB.billing_last_name = this.creditCardObj.cardHolder;
      this.paramForDB.billing_address = this.creditCardObj.cardHolder;
      this.paramForDB.billing_address2 = this.creditCardObj.cardHolder;
      this.paramForDB.billing_postcode = this.creditCardObj.cardHolder;
      this.paramForDB.billing_city = this.creditCardObj.cardHolder;
      this.paramForDB.billing_country = this.creditCardObj.cardHolder;
      this.paramForDB.card_intent = cardIntent;
      this.paramForDB.isTermsSelected = this.creditCardObj.isTermsSelected;
          this.service.addCreditCards(this.paramForDB, this.token).then((res: any) => {
            if (res.code == 200) {
              if (this.tempDetails.fromPayment == true) {
                //Add Payment when card added
                this.gotoFirstStep(res.data[0]['id']);
                //End 
              } else {
                this.loadingScreen.dismissLoading();
                this.successMSGModal(this.translate.instant('CARD_ADDED'),this.translate.instant('CREDIT_DEBIT_CARD_ADDED'), "1500");
                this.navController.pop();
              }
    
            } else {
              this.loadingScreen.dismissLoading();
              this.errorMSGModal(this.translate.instant('OK_BUTTON'),res.message);
            }
          }).catch(err => {
            this.loadingScreen.dismissLoading();
            this.errorMSGModal( this.translate.instant('ERROR_TRY_AGAIN'),  this.translate.instant('ERROR_MESSAGE'));
          })
          //End 
     
    }

  }

  gotoBack() {
    this.navController.pop();
  }

  async gotoFirstStep(cardId: any) {
    // Step 1-> Get Client secret key from Server side 
    this.service.createPaymentIntent(this.paymentIntentObj, this.token).then((res: any) => {
   
      if (res.code == 200) {
        this.clientSecret = res.data[0].client_secret;
        this.cardIntentObj.card_id = cardId;
        this.stripeCardObj.card_id = cardId;
        this.cardIntentObj.intent_id = res.data[0].id;
        this.callPaymentIntentFromApp(this.cardIntentObj);

      } else {
        this.loadingScreen.dismissLoading();
        this.errorMSGModal( this.translate.instant('ERROR_TRY_AGAIN'),  this.translate.instant('ERROR_MESSAGE'));
        this.clientSecret = '';
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
      this.errorMSGModal( this.translate.instant('ERROR_TRY_AGAIN'),  this.translate.instant('ERROR_MESSAGE'));
      this.clientSecret = '';
    })
  }

  //Step 2 : Send Intent and card Id to server 
  async callPaymentIntentFromApp(paymentObj: any) {
    this.service.paymentCardIntent(paymentObj, this.token).then((res: any) => {
      if (res.code == 200) {
       // this.successMSGModal("Your payment intent has been successfully created and is ready for processing.","Payment Intent Created", "1500");
        this.actualStripePayment(this.clientSecret, res.data[0].payment_method);
      } else {
        this.loadingScreen.dismissLoading();
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
      this.errorMSGModal( this.translate.instant('ERROR_TRY_AGAIN'),  this.translate.instant('UNABLE_CREATE_INTENT'));
   
    })
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
      this.errorMSGModal( this.translate.instant('ERROR_TRY_AGAIN'),  this.translate.instant('PAYMENT_CONFIRMATION_FAILED'));
    } else if (paymentIntent && paymentIntent.status == 'succeeded') {
     
      this.stripeCardObj.payment_intent = paymentIntent;
      this.stripeCardObj.isTermsSelected = this.creditCardObj.isTermsSelected;
      // For Card selected Credit/debit card 
      this.loadingScreen.dismissLoading();
      const modalFirstOpt = await this.modalController.create({
        component: ProcessingBarPage,
        componentProps: { 'value': this.stripeCardObj, 'value1': this.token, 'value2': this.stripeCardObj.iccid }
      });
      modalFirstOpt.onDidDismiss();
      return await modalFirstOpt.present();
      //End code  
    }

  }

  validate() {
    if (this.creditCardObj.cardHolder == '' || this.creditCardObj.cardHolder == null || this.creditCardObj.cardHolder == 'undefined' ) {
      this.errorMSGModal( this.translate.instant('OK_BUTTON'),  this.translate.instant('CARD_HOLDER_REQUIRED'));
      return false;
    }
    else if (!this.creditCardObj.cardNumber || !this.creditCardObj.cardNumber._complete) {
      this.errorMSGModal( this.translate.instant('OK_BUTTON'),  this.translate.instant('INVALID_CARD_NUMBER'));
      return false;
    }
    else if (!this.creditCardObj.expirationDate || !this.creditCardObj.expirationDate._complete) {
      this.errorMSGModal( this.translate.instant('OK_BUTTON'),  this.translate.instant('INVALID_EXPIRATION_DATE'));
      return false;
    }
    else if (!this.creditCardObj.cvv || !this.creditCardObj.cvv._complete) {
      this.errorMSGModal( this.translate.instant('OK_BUTTON'),  this.translate.instant('INVALID_CVV'));
      return false;
    }
    return true;
  }

  gotoMarketPlace()
		  {
		    this.navController.navigateRoot('marketplace');
		  }
      
  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }
  gotoTab5() {
   if (!window.localStorage.getItem('L2TraveleSIM_auth_token')) {
    this.navController.navigateRoot('tab5');
} else {
    this.navController.navigateRoot('profile');
}
  }

  gotoHomeSearch()
  {
    this.navController.navigateRoot('home-search');
  }
  

   //Error Modal
   async errorMSGModal(buttonText:any, msg:any) {
    const modal = await this.modalController.create({
      component: PasswordErrorPage,
      componentProps: { 'value': msg , 'value1': buttonText}
    });

    modal.onDidDismiss();
    return await modal.present();
  }

 //Success Modal
  async successMSGModal(buttonText:any, msg:any, times:any) {
    const modal = await this.modalController.create({
      component: SuccessModelPage,
      componentProps: { 'value': msg , 'value1': buttonText, 'value2': times}
    });

    modal.onDidDismiss();
    return await modal.present();
  }
}
