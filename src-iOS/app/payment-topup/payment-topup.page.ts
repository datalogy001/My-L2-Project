import { ConfirmContinuePage } from '../confirm-continue/confirm-continue.page';
import { Component, OnInit, Input, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Platform, NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { ServicesService } from '../api/services.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { ProcessingBarFpayTopupPage } from '../processing-bar-fpay-topup/processing-bar-fpay-topup.page';
import { ProcessingBarGooglePayTopupPage } from '../processing-bar-google-pay-topup/processing-bar-google-pay-topup.page';
import { ProcessingBarTlyncTopUpPayPage } from '../processing-bar-tlync-top-up-pay/processing-bar-tlync-top-up-pay.page';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { loadStripe, Stripe, StripeElements, StripeCardNumberElement, StripeCardExpiryElement, StripeCardCvcElement } from '@stripe/stripe-js';
import { TranslateService } from '@ngx-translate/core';
import { SuccessModelEsimPage } from '../success-model-esim/success-model-esim.page';
import { PermissionModalPage } from '../permission-modal/permission-modal.page';
import { ProcessingBarApplePayTopupPage } from '../processing-bar-apple-pay-topup/processing-bar-apple-pay-topup.page';
import Swiper from 'swiper';
//declare var sgap: any;
declare var customStripePlugin: any;
declare var sgap: any;

@Component({
  selector: 'app-payment-topup',
  templateUrl: './payment-topup.page.html',
  styleUrls: ['./payment-topup.page.scss'],
})
export class PaymentTopupPage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  private stripe: Stripe | null = null;
  tempDetails: any = [];
  checkoutObj: any = { 'status': '', 'amount': '', 'currency': '', 'paymentId': '', 'PayerID': '', 'token': '', 'payment_method' : '', 'payment_intent':''};
  accessToken: any = '';
  userDetails: any = [];
  paymentType: any = '';
  card_id: any;
  currencyCode: any = 'USD';
  selectedCards: boolean[] = [];
  isData: any = true;
  stripe_key: any = this.service.stripePubliserKey;
  stripeCardObj: any = { 'card_id': ''};
  paymentMethod: any = [];
  isDataAvail: any = true;
  clientSecret: any = '';
  paymentIntentObj: any = { 'amount': '', 'currency': '', 'plan': '' };
  cardIntentObj: any = { 'card_id': '', 'intent_id': '' };
  types: any = '';
  isCardSelected: any = false;
  loading = false;
  creditDebitType: any = '';
  googlePayType: any = '';
  cardList: any = [];
  private browserInstance: any;  // To store the reference to the browser
  private backButtonSubscription: any;  // To store the back button subscription
  
    constructor(private iab: InAppBrowser,private zone: NgZone,private translate: TranslateService,private popoverController: PopoverController, private loadingScreen: LoadingScreenAppPage, private platform: Platform, private loadCtr: LoadingController, private service: ServicesService, private navController: NavController, private toastController: ToastController, private Router: Router, private modalController: ModalController) {
      
     }

    swiperSlideChanged(e: any) {
      //console.log('changed: ', e);
    }
  
    swiperReady() {
      this.swiper = this.swiperRef?.nativeElement.swiper;
    }

    async initStripeFun() {
      this.stripe = await loadStripe(this.service.stripePubliserKey);
      if (!this.stripe) {
        console.error('Stripe failed to initialize');
        return;
      }
    }

  ionViewDidEnter() {
    this.getCreditCards();
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

  // Function to handle radio button click
  cartOpt(index: number, cardDetails: any) {
    // Reset all selections
    this.selectedCards.fill(false);
    // Set the selected card
    this.isCardSelected = true;
    this.selectedCards[index] = true;
    this.stripeCardObj.card_id = cardDetails.id;
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

selectedLanguage:any;
noApplePaySetup:any;

  selectedPaymentType: string = 'apple-pay'; // Set Gogole Pay as the default selected option
  // Load the available payment methods
  loadPaymentMethods() {
    this.paymentMethod = [{ type: 2, text: 'Apple Pay', img: 'assets/img/applepay-dark.png' }];
    //this.selectedPaymentType = 'apple-pay'; // Apple Pay selected by default
  }
  countryCode:any;
lang:any;

  ngOnInit() {
         this.lang = window.localStorage.getItem("L2TraveleSIM_language") || 'en';
     this.paymentType = '';
        this.loadPaymentMethods();
        this.initStripeFun();
this.selectedLanguage = window.localStorage.getItem("L2TraveleSIM_language") || 'en';

    if(this.selectedLanguage == 'en')
    {
      this.noApplePaySetup = "No Apple Pay setup. Please add a card in Wallet.";
    }else
    {
   this.noApplePaySetup = "لا يوجد إعداد لـ Apple Pay. يرجى إضافة بطاقة إلى تطبيق Wallet.";
    }
 
        this.paymentMethod = [{ 'type': 1, 'text': 'Credit/Debit', 'img': 'assets/img/credit-card-dark.png' }, { 'type': 2, 'text': 'Google Pay', 'img': 'assets/img/googlepay.png' }];
        this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
        this.applePayErrorMSG = "Apple Pay is unavailable. Please add a card to your Apple Wallet to proceed." ;
        this.checkoutObj = this.tempDetails.topupAMTData;

        console.log(JSON.stringify(this.checkoutObj));

        if (window.localStorage.getItem('L2TraveleSIM_currency') == null) {
          this.currencyCode = 'USD';
        } else {
          this.currencyCode = window.localStorage.getItem('L2TraveleSIM_currency');
        }

        if (window.localStorage.getItem('L2TraveleSIM_countryCode') == null) {
          this.countryCode = 'US';
        } else {
          this.countryCode = window.localStorage.getItem('L2TraveleSIM_countryCode');
        }
        

        if(this.currencyCode == 'LYD')
    {
     this.selectedPaymentType = 'tlync'; //
    }else{
     this.selectedPaymentType = 'apple-pay'; // Apple Pay selected by default
    }


        this.accessToken = window.localStorage.getItem('L2TraveleSIM_auth_token');
        this.userDetails = window.localStorage.getItem('L2TraveleSIM_userDetails');
        this.userDetails = JSON.parse(this.userDetails);
        this.checkoutObj.PayerID= this.userDetails.id
        console.log("Main card" + this.checkoutObj.PayerID);
  }

  setupGooglePay(totalAmount:any,currency:any) {
    if (this.platform.is('android') || this.platform.is('ios')) {
      sgap.setKey(this.service.stripePubliserKey);
      sgap.isReadyToPay().then(() => {
        sgap
          .requestPayment(totalAmount.toString(), currency)
          .then((responsePayment: any) => {
            this.managingAppLogs("From App Step 2 Credit-topup: Google Pay Native SDK Success: " + JSON.stringify(responsePayment) ,this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
            this.actualStripePaymentGooglrPay(this.clientSecret, responsePayment);
          })
          .catch((errorPayment: any) => {
               this.managingAppLogs("From App Step 2 Credit-topup: Google Pay Native SDK Error: " + JSON.stringify(errorPayment) ,this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
         
            this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('payment_cancelled') );
          });
      }).catch((error: any) => {
        this.managingAppLogs("From App Step 2 Credit-topup: Google Pay Native SDK Payment Cancelled : " + JSON.stringify(error) ,this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
        this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'), this.translate.instant('payment_cancelled') );
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
    this.managingAppLogs("From App Step 3 Credit-topup: Google Pay confirmation Payment Failed:" + JSON.stringify(confirmError),this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
    this.errorMSGModal(
      this.translate.instant('ERROR_TRY_AGAIN'),
      this.translate.instant('PAYMENT_CONFIRMATION_FAILED')
    );
  } else if (paymentIntent && paymentIntent.status == 'succeeded') {
    
    this.checkoutObj.payment_intent = paymentIntent;
    this.loadingScreen.dismissLoading();
    this.managingAppLogs("From App Step 3 Credit-topup: Google Pay Confirmation Payment Success:" + JSON.stringify(paymentIntent),this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);   
    const modalFirstOpt = await this.modalController.create({
      component: ProcessingBarGooglePayTopupPage,
      componentProps: { value: this.checkoutObj, value1: this.accessToken},
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
      this.managingAppLogs("From App Step 3 Credit Topup: Card Confirmation Payment Failed:" + JSON.stringify(confirmError),this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
      this.errorMSGModal( this.translate.instant('ERROR_TRY_AGAIN'),  this.translate.instant('PAYMENT_CONFIRMATION_FAILED'));
    } else if (paymentIntent && paymentIntent.status == 'succeeded') {
      this.checkoutObj.payment_intent = paymentIntent;
      // For Card selected Credit/debit card 
      console.log("Card PARAM=> " + JSON.stringify(this.checkoutObj));
      this.managingAppLogs("From App Step 3 Credit Topup: Card Confirmation Payment Success:" + JSON.stringify(paymentIntent),this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
      this.loadingScreen.dismissLoading();
      const modalFirstOpt = await this.modalController.create({
        component: ProcessingBarFpayTopupPage,
        componentProps: { 'value': this.checkoutObj, 'value1': this.accessToken }
      });
      modalFirstOpt.onDidDismiss();
      return await modalFirstOpt.present();
      //End code  
    }

  }
  applePayErrorMSG: any; 
  
  
  // Native plugin returns success | error | cancellation
  async verifyAndHandle(nativeResponse: any) {
    await this.loadingScreen.presentLoading();

    try {
      const res: any = await this.service.verifyPaymentIntent(nativeResponse, this.accessToken);
      this.loadingScreen.dismissLoading();

      if (res.code === 200) {
        this.handleApplePaySuccess(nativeResponse);

        this.managingAppLogs(
          "Apple Pay Payment Verification Success for Credit TOP-UP => " + JSON.stringify(res),
          this.currencyCode,
          this.checkoutObj.amount,
          "Credit TOP-UP"
        );
      } else {
        this.managingAppLogs(
          "Apple Pay Payment Verification Failed for Credit TOP-UP => " + JSON.stringify(res),
          this.currencyCode,
          this.checkoutObj.amount,
          "Credit TOP-UP"
        );

        this.errorMSGModal(
          this.translate.instant('ERROR_TRY_AGAIN'),
          res.message
        );
      }

    } catch (err) {
      this.loadingScreen.dismissLoading();

      this.managingAppLogs(
        "Apple Pay Verify Payment ERROR CATCH BLOCK for Credit TOP-UP=> " + JSON.stringify(err),
        this.currencyCode,
        this.checkoutObj.amount,
        "Credit TOP-UP"
      );

      this.errorMSGModal(
        this.translate.instant('ERROR_TRY_AGAIN'),
        JSON.stringify(err)
      );
    }
  }

  // AFter Response from Apple pay Native code 

  async handleApplePaySuccess(obj: any) {
    await this.loadingScreen.dismissLoading();
    this.checkoutObj.status = 'success';
    this.checkoutObj.payment_intent = {
      "id": obj.payment_intent_id,
      "status": "succeeded"
    };


    console.log("Payment Intent ID =>", this.checkoutObj.payment_intent.id);

    const modal = await this.modalController.create({
      component: ProcessingBarApplePayTopupPage,
      componentProps: {
        value: this.checkoutObj,
        value1: this.accessToken
      }
    });
    await modal.present();
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

paymentIntentApplePayObj: any = { 'amount': '', 'currency': '', 'plan': '' };


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

  // Apple Pay & Card → LD NOT allowed
  if (
    (this.selectedPaymentType === 'apple-pay' || this.selectedPaymentType === 'credit-debit') &&
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
  
          // ✅ Currency vs payment method validation
      if (!this.validatePaymentCurrency()) return;

    if (this.selectedPaymentType == 'apple-pay') {
  
      this.managingAppLogs(
        "Step 1: Credit Top-up: Apple Pay Checkout Started",
        this.currencyCode,
        this.checkoutObj.amount,
        "Credit TOP-UP"
      );


      // Calling Intent API for Apple pay - NEW code started 
      await this.loadingScreen.presentLoading();
      this.paymentIntentApplePayObj.amount = parseFloat(this.checkoutObj.amount);
      this.paymentIntentApplePayObj.currency = this.currencyCode;
      this.paymentIntentApplePayObj.plan = "Credit TOP-UP";

      // NEW CREATE INTENT API STARTED
      this.service.createIntentFromBackend(this.paymentIntentApplePayObj, this.accessToken).then((res: any) => {
        if (res.code == 200) {

          this.loadingScreen.dismissLoading();
          const clientSecret = res.data[0].client_secret;
          const paymentIntentId = res.data[0].id;

          this.managingAppLogs(
            `Apple Pay Intent Created for Credit TOP-UP=> Client Secret: ${clientSecret}, Intent ID: ${paymentIntentId}`,
            this.currencyCode,
            this.checkoutObj.amount,
            "Credit TOP-UP"
          );

          // Apple pay plugin native code started 
          customStripePlugin.makePayment({ "amount": parseFloat(this.checkoutObj.amount), "countryCode": this.countryCode, "currency": this.currencyCode, "description": "L2 Travel SIM", "NosetupApplePay": this.noApplePaySetup, "api_key": this.service.stripePubliserKey, "client_secret": clientSecret, "payment_intent_id": paymentIntentId },
            async (successResponse: any) => {
              //Success call back
              this.managingAppLogs(
                "Step 2: Apple Pay Native Success for Credit TOP-UP => " + JSON.stringify(successResponse),
                this.currencyCode,
                this.checkoutObj.amount,
                "Credit TOP-UP"
              );

              await this.verifyAndHandle(successResponse);

            },
            async (error: any) => {
              // Error callback / User cancellation
              this.managingAppLogs(
                "Step 2: Apple Pay Native Error for Credit TOP-UP => " + JSON.stringify(error),
                this.currencyCode,
                this.checkoutObj.amount,
                "Credit TOP-UP"
              );

              await this.verifyAndHandle(error);
            });

        } else {
          this.managingAppLogs(
            "Apple Pay Intent Creation Error for Credit TOP-UP =>" + JSON.stringify(res),
            this.currencyCode,
            this.checkoutObj.amount,
            "Credit TOP-UP"
          );

          this.errorMSGModal(
            this.translate.instant('ERROR_TRY_AGAIN'),
            this.translate.instant('ERROR_MESSAGE_INTENT')
          );
        }
      }).catch(err => {
        this.loadingScreen.dismissLoading();
        this.managingAppLogs(
          "Apple Pay Intent Creation Error Catch Block for Credit TOP-UP=> " + JSON.stringify(err),
          this.currencyCode,
          this.checkoutObj.amount,
          "Credit TOP-UP"
        );

        this.errorMSGModal(
          this.translate.instant('ERROR_TRY_AGAIN'),
          this.translate.instant('ERROR_MESSAGE_INTENT')
        );
      })
      //End of Apple pay code 

      
      
      /*customStripePlugin.makePayment({"amount" : parseFloat(this.checkoutObj.amount), "countryCode": this.countryCode,"currency" : this.currencyCode, "description" :"Coop Travel eSIM", "plan": "Credit TOP-UP" , "token" : this.accessToken, "ApplePayErrorMSG" : this.applePayErrorMSG, "NosetupApplePay" : this.noApplePaySetup}, (success: any) => {
        // API calls 
        this.managingAppLogs("From App Step 2 Credit Top-up: Apple Pay Success FROM Native SDK: " + JSON.stringify(success),this.currencyCode,  this.checkoutObj.amount, "Credit TOP-UP");
        this.successApplePay(success.clientSecret);
        }, (error: any) => {
          this.managingAppLogs("From App Step 2 Credit Top-up:  Apple Pay Error FROM Native SDK: " + JSON.stringify(error),this.currencyCode, this.checkoutObj.amount, "Credit TOP-UP");
            this.errorMSGModal(this.translate.instant('ERROR_TRY_AGAIN'),this.translate.instant(error.message));
        });  */


        }
        else if (this.selectedPaymentType == 'tlync') {
        this.tlyncPaymentIntegration();
      }
      else{
        if (this.cardList.length > 0 && this.isCardSelected == false) {
          this.gotoPernissionModel();
        }
        else {
        if (this.isCardSelected == true) {
  
          await this.loadingScreen.presentLoading();
          // Step 1-> Get Client secret key from Server side 
          this.paymentIntentObj.currency = this.currencyCode;
          this.paymentIntentObj.amount = this.checkoutObj.amount;
          this.paymentIntentObj.plan = "TOP-UP";
          this.managingAppLogs("From App Step 1 Credit-Topup Card Intent Started",this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
          this.service.createPaymentIntent(this.paymentIntentObj, this.accessToken).then((res: any) => {
  
            if (res.code == 200) {
              // this.presentToast("Initialize Payment Intent", "Success");
              this.clientSecret = res.data[0].client_secret;
              this.cardIntentObj.card_id = this.stripeCardObj.card_id;
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
        else {
          let navigationExtras: NavigationExtras = {
            state: {
              stripeCardData: this.checkoutObj,
              fromPayment: true
            }
          };
          this.Router.navigate(['/add-card-fpay-topup-wallet'], navigationExtras);
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
                   console.log("ltync-pay-init-checkout" + JSON.stringify(this.checkoutObj));
                  await this.loadingScreen.presentLoading();
                  this.managingAppLogs("From App Step 1 Credit Topup : Card Intent Started for ltync payment",this.currencyCode,  this.checkoutObj.amount, "Top-up credit");
                  //Amount need to be check for coupon 
                  this.res = await this.service.creteintentfortopup(this.checkoutObj, this.accessToken);
                
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
            this.managingAppLogs("From App Step 2 Credit Topup: After Successful Payment Callback EntryPoints tlync" + JSON.stringify(order_id),this.currencyCode,  this.checkoutObj.amount, "Credit top-up");
              this.checkoutObj.order_id = order_id;
              this.loadingScreen.dismissLoading();
              const modalFirstOpt = await this.modalController.create({
                component: ProcessingBarTlyncTopUpPayPage,
                componentProps: { 'value': this.checkoutObj, 'value1': this.accessToken }
              });
              modalFirstOpt.onDidDismiss();
              return await modalFirstOpt.present();
        
          } catch (error) {
            // Catch invalid URL or unexpected errors
            this.managingAppLogs("From App Step 2  Credit Topup: After Successful Payment Callback Error tlync " + JSON.stringify(error),this.currencyCode,  this.checkoutObj.amount, "Credit top-up");
            this.errorMSGModal(
              this.translate.instant('ERROR_TRY_AGAIN'),
              this.translate.instant('PAYMENT_CONFIRMATION_FAILED')
            );
            console.error('Error parsing entryPoints URL:', error);
          }
        
        }
    

    //Step 2 : Send Intent and card Id to server 
  async callPaymentIntentFromApp(paymentObj: any) {
    this.managingAppLogs("From App Step 2 Credit Top-up: Payment Intent Started",this.currencyCode,  this.paymentIntentObj.amount, this.paymentIntentObj.plan);
    this.service.paymentCardIntent(paymentObj, this.accessToken).then((res: any) => {
      if (res.code == 200) {
        this.actualStripePayment(this.clientSecret, res.data[0].payment_method);
      } else {
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
      this.errorMSGModal( this.translate.instant('ERROR_TRY_AGAIN'),  this.translate.instant('UNABLE_CREATE_INTENT'));
    })
  }

  async gotoPernissionModel() {
    const modal = await this.modalController.create({
      component: PermissionModalPage,
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data.inputValue == true) {
        let navigationExtras: NavigationExtras = {
          state: {
            stripeCardData: this.checkoutObj,
            fromPayment: true
          }
        };
        console.log("Main card 3" + this.checkoutObj.PayerID);
        this.Router.navigate(['/add-card-fpay-topup-wallet'], navigationExtras);
      } else {

        // Reset all selections and choose first
        this.selectedCards.fill(false);
        // Set the selected card
        this.isCardSelected = true;
        this.selectedCards[0] = true;
        this.stripeCardObj.card_id = this.cardList[0]['id'];
        this.paymentType = '';
      }
    });

    return await modal.present();
  }

   // Event handler for radio button change
   onPaymentTypeChange(event: any) {
    this.selectedPaymentType = event.detail.value;
    if (this.selectedPaymentType == 'apple-pay') {
      this.creditDebitType = '';
      this.isCardSelected = false;
    } else if (this.selectedPaymentType == 'credit-debit') {
      this.isCardSelected = false;
    }
 
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

  gotoBack() {
    this.navController.pop();
  }

  gototab5() {
    this.navController.navigateRoot('tab5');
  }

  gototab1() {
    this.navController.navigateRoot('tab1');
  }

  
	gotoMarketPlace()
  {
    this.navController.navigateRoot('marketplace');
  }


}
