import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  
  restAPI: string = "https://l2travelesim.com/api/v3/"; // V3 with Development Domain
  stripePubliserKey: string = 'pk_live_51SYiOcFl6yW1DvK0ICubSTmzJM5mUx9wSXtpgS8LJcezyDnTdDFlFViC8NNpDmIXCx83WLvyUDixXLkVeFZA11Uo00MUa40yMR';     
  whiteLabelId: any = "282";
  clientToken:any = 'HpTRffxL96HqB3GrDN5lRfKnnH4QnfYn9dZoURNGaTjWY5f2v'; 

  
  constructor(private http: HttpClient) { }

  //Paypal API's
  callPaypalService(obj: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)

      return this.http.post(this.restAPI + 'pay', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Update order
  checkoutOrder(obj: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'orderCheckout', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Update order Gpay
  checkoutGPay(obj: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'googlepay', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Update order Apple pay
  checkoutApplePay(obj: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'applepay', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }



  removeCreditCard(obj: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'user/deletecardDetails', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  removeNotification(obj: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'delteNotification', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  
//Get casnbacks 

  getcashBackDetails(obj: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'cashbackEligable', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

//Get Coupens
applyCoupenCode(obj: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'getCouponCode', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  

  removePaymentHistory(obj: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'delPaymentHistory', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  addPlayerId(obj: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'restlogin', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  isCheckedUserDeleted(obj: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'checkuserdeleted', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  getCommision() {
    return new Promise((resolve, reject) => {
      return this.http.get(this.restAPI + 'commission').subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //Freedom Payment 

  fpaypayment(obj: any, access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');

    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'fpay_payment', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //Stripe Payment 
  //Update order
  stripePayment(obj: any, access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');

    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'user/stripePayment', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  stripePaymentTopup(obj: any, access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');

    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'card/pay/topup', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  

  // Purchasing esim using App credits  

debitFromAppCreditWallet(obj: any, access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'walletpay', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

//Ltync pay
    confirmationLtync(obj: any, access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');

    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'confirmationLtync', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  stripeGooglePay(obj: any, access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');

    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'stripegooglepay', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  stripeGooglePayTopUpWallet(obj: any, access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');

    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'google/pay/topup', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

   initiateToupPayment(obj: any, access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');

    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'ltyncCreditTopup', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }




  //paymentCardIntent Payment 
  //Update order
  paymentCardIntent(obj: any, access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'paymentCardIntent', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }



  //createAccount
  createAccount(obj: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    this.selectedCurrency = window.localStorage.getItem('L2TraveleSIM_currency') == null ? 'USD' : window.localStorage.getItem('L2TraveleSIM_currency');

    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('currency',this.selectedCurrency)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'register', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  selectedCurrency:any='USD'; 

  //LoginService
  loginService(obj: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    this.selectedCurrency = window.localStorage.getItem('L2TraveleSIM_currency') == null ? 'USD' : window.localStorage.getItem('L2TraveleSIM_currency');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('currency',this.selectedCurrency)
        .set('client-token', this.clientToken)
        .set('language', this.selectedLang)
      return this.http.post(this.restAPI + 'login', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Google Login service
  googleLogin(obj: any) {
    this.selectedCurrency = window.localStorage.getItem('L2TraveleSIM_currency') == null ? 'USD' : window.localStorage.getItem('L2TraveleSIM_currency');
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('currency',this.selectedCurrency)
        .set('client-token', this.clientToken)

      return this.http.post(this.restAPI + 'googlelogin', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Google Login service
  googleteliTravelLogin(obj: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'googlelogin', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }



  //Apple sign in service
  appleSignIn(obj: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    this.selectedCurrency = window.localStorage.getItem('L2TraveleSIM_currency') == null ? 'USD' : window.localStorage.getItem('L2TraveleSIM_currency');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('currency',this.selectedCurrency)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'applelogin', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //Forgot password
  forgotPass(obj: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'forgotPassword', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Reset password
  retrivePassword(obj: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'retrivePassword', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  // Get getBundleUsedData Updated API
  dataObj:any={id:''};
  getBundleUsedData(paramId: any) {
  this.dataObj.id = paramId;
    this.authToken =  window.localStorage.getItem('L2TraveleSIM_auth_token');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
        .set('Authorization', 'Bearer ' + this.authToken)
      return this.http.post(this.restAPI + 'geteSIMGODatabalance', JSON.stringify(this.dataObj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  // Get Bundle List
  getBundlesList(code: any, searchItem: any) {
    var objData = { 'iso': code, 'type': searchItem };
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
      .set('whitelabel', this.whiteLabelId)
      .set('client-token', this.clientToken)
      .set('Content-Type', 'application/json; charset=utf-8')
       return this.http.post(this.restAPI + 'user/choosebundle', JSON.stringify(objData), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  //Currency API's
  getCurrencyUpdates(currencyCode: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.get('https://api.exchangerate.host/latest?base=' + currencyCode, { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //List of images API's
  getListOfImages(countryName: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'networks/' + countryName, { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  selectedLang: any;
  //Privacy Policies 
  getPrivacyPolicies() {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'privacy_policies', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //Privacy Policies 
  gettermsandCond() {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'term_conditions', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //About us
  getAboutUs() {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'about_us', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }



  //FAQ API's
  getFAQS() {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'faq', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //verifyAccount API's
  verifyAccount(obj: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'verifyEmail', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  
  //Get user details 
  getuserDetails
  () {
    this.selectedCurrency = window.localStorage.getItem('L2TraveleSIM_currency') == null ? 'USD' : window.localStorage.getItem('L2TraveleSIM_currency');
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    this.authToken =  window.localStorage.getItem('L2TraveleSIM_auth_token');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.authToken)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('currency',this.selectedCurrency)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'user/profile', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


   //getCreditHistory
   getCreditHistory(access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'wallet/transactions', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

    //getReferHistory
    getReferHistory(access_token: any) {
      this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
      return new Promise((resolve, reject) => {
        const headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + access_token)
          .set('Content-Type', 'application/json; charset=utf-8')
          .set('whitelabel', this.whiteLabelId)
          .set('language', this.selectedLang)
          .set('client-token', this.clientToken)
        return this.http.get(this.restAPI + 'refferel_history', { headers }).subscribe((res: any) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    }
  
//getShareAmount
getShareAmount(obj: any, access_token:any) {
  this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
  return new Promise((resolve, reject) => {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + access_token)
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('whitelabel', this.whiteLabelId)
      .set('language', this.selectedLang)
      .set('client-token', this.clientToken)
    return this.http.get(this.restAPI + 'referal/amounts', { headers }).subscribe((res: any) => {
      resolve(res);
    }, (err) => {
      reject(err);
    });
  });
}

//Earn wallets Refer code 
authToken:any;
earnWalletRefer(obj: any) {
  
  this.authToken =  window.localStorage.getItem('L2TraveleSIM_auth_token');
  this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
  return new Promise((resolve, reject) => {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('whitelabel', this.whiteLabelId)
      .set('language', this.selectedLang)
      .set('client-token', this.clientToken)
      .set('Authorization', 'Bearer ' + this.authToken)
    return this.http.post(this.restAPI + 'earns_wallet_credit',JSON.stringify(obj),  { headers }).subscribe((res: any) => {
      resolve(res);
    }, (err) => {
      reject(err);
    });
  });
}

//validate_refer_code
validate_refer_code(obj: any) {
  this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
  return new Promise((resolve, reject) => {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('whitelabel', this.whiteLabelId)
      .set('client-token', this.clientToken)
      .set('language', this.selectedLang)
    return this.http.post(this.restAPI + 'validate/referal',JSON.stringify(obj),  { headers }).subscribe((res: any) => {
      resolve(res);
    }, (err) => {
      reject(err);
    });
  });
}

validate_voucher_code(obj: any, access_token:any) {
  this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
  return new Promise((resolve, reject) => {
    const headers = new HttpHeaders()
     .set('Authorization', 'Bearer ' + access_token)
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('whitelabel', this.whiteLabelId)
      .set('language', this.selectedLang)
      .set('client-token', this.clientToken)
    return this.http.post(this.restAPI + 'voucher/purchase',JSON.stringify(obj),  { headers }).subscribe((res: any) => {
      resolve(res);
    }, (err) => {
      reject(err);
    });
  });
}

  //getNotificationList
  getNotificationList(access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'notifications', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  readNoti(user_id: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'notifications/' + user_id, { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
 

   //isProfileIncompleteService  
   
  isProfileIncompleteService(obj:any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    this.selectedCurrency = window.localStorage.getItem('L2TraveleSIM_currency') == null ? 'USD' : window.localStorage.getItem('L2TraveleSIM_currency');
    this.authToken =  window.localStorage.getItem('L2TraveleSIM_auth_token');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.authToken)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('currency',this.selectedCurrency)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'user/profilestatus',JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Updated wallte balance 
  updatedWalletBalance() {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    this.selectedCurrency = window.localStorage.getItem('L2TraveleSIM_currency') == null ? 'USD' : window.localStorage.getItem('L2TraveleSIM_currency');
    this.authToken =  window.localStorage.getItem('L2TraveleSIM_auth_token');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.authToken)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('currency',this.selectedCurrency)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'wallet/balance', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  //updateUserLanguage
  updateUserLanguage(access_token: any, obj: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + access_token)
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'updateUserLanguage', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  
  //updateUserLanguage
  delPhoto( obj: any,access_token: any,) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + access_token)
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
        .set('language', this.selectedLang)
      return this.http.post(this.restAPI + 'delete/profile/image', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //getupdateServiceSettings
  getupdateServiceSettings(access_token: any, obj: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + access_token)
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'app_service', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //getupdatePaymentSettings
  getupdatePaymentSettings(access_token: any, obj: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + access_token)
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'app_payment', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //getupdatePromoSettings
  getupdatePromoSettings(access_token: any, obj: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + access_token)
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'app_promotions', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //getupdatePromotion
  getupdatePromotion(access_token: any, obj: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + access_token)
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'promotion_email', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //customerSupport
  customerSupport(obj: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'contact_form', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //gotoPurchasedBundles API 
  gotoPurchasedBundles(access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'user/bundle_expired', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Get Payment History
  getPaymentHistory(access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'user/paymentHistory', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Add addCreditCardsfPay
  addCreditCardsfPay(obj: any, access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'add_card_fpay', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Add Credit Cards API's
  addCreditCards(obj: any, access_token: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'user/addcardDetails', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //Get CreditCardFpayDetails
  getCreditCardFpayDetails(access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'save_card_list_fpay', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //Get Credit card details
  getCreditCardDetails(access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'user/cardDetails', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Delete Account API's
  deleteAccount(obj: any, access_token: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + access_token)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'user/deleteAccount', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  //checkForAppUpdate - App version API 
  checkForAppUpdate(obj: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'versions/' + obj.app_platform, { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //getcountryList
  getCountryListDB(paramObj: any) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'esim_countries_zone', JSON.stringify(paramObj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Get Bundles from DB
  getBundleFromDB(obj: any) {
    this.authToken =  window.localStorage.getItem('L2TraveleSIM_auth_token') != null? window.localStorage.getItem('L2TraveleSIM_auth_token') : '';
    return new Promise((resolve, reject) => {

      if(this.authToken !=null && this.authToken !='')
      {
      var  headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
        .set('Authorization', 'Bearer ' + this.authToken)
      }else{
        var headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      }
      return this.http.post(this.restAPI + 'choosebundle', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

   


    // tlync create intent topup
  creteintentfortopup(obj: any, authToken: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + authToken)
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'initiateTopupPayment', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

   // tlync create intent
  createInitPaymenttlync(obj: any, authToken: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + authToken)
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'initiatePayment', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  // Stripe with 3d secure start
  createPaymentIntent(obj: any, authToken: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + authToken)
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'createIntentApp', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  createAddCardIntent(authToken: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + authToken)
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.get(this.restAPI + 'cardsetup', { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  // Update Profile
  updateProfile(obj: any, authToken: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + authToken)
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'user/updateprofile', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //API to Manage Logs 
  appSideLogs(obj: any, authToken: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + authToken)
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'applog', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

//API to get country for residence 
 countryObj:any  ={'language' :''};  
 listOfCountriesForResidence() {
    this.countryObj.language = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('whitelabel', this.whiteLabelId)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'resisenceofCountry',JSON.stringify(this.countryObj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  
  
  //API to Complete signup 
  completeSignup(obj: any, authToken: any) {
    this.selectedLang = window.localStorage.getItem('L2TraveleSIM_language') == null ? 'en' : window.localStorage.getItem('L2TraveleSIM_language');
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', 'Bearer ' + authToken)
        .set('whitelabel', this.whiteLabelId)
        .set('language', this.selectedLang)
        .set('client-token', this.clientToken)
      return this.http.post(this.restAPI + 'user/completeprofile', JSON.stringify(obj), { headers }).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

}

