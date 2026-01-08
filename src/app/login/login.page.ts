import { Component, OnInit, } from '@angular/core';
import { Platform, NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import { AppleModelPage } from '../apple-model/apple-model.page'
import { HttpClient, HttpParams } from '@angular/common/http'
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import OneSignalPlugin from 'onesignal-cordova-plugin';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { TranslateService } from '@ngx-translate/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import {SocailLoginCountryPhonePage} from '../socail-login-country-phone/socail-login-country-phone.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
 
  // Variables 
  appleresult: any;
  loginObj: any = { 'password': '', 'email': '', 'deviceToken': '' };
  rememberMe: boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';
  tempDetails: any = [];
  checkoutObj: any = [];
  isLogin: any = '';
  googleLoginObj: any = { 'userId': '', 'first_name': '', 'email': '', 'deviceToken': '', 'requested_ip' : '' };
  facebookObj: any = { 'userId': '', 'first_name': '', 'email': '', 'deviceToken': '' };
  appleLoginObj: any = { 'apple_id': '', 'first_name': '', 'email': '', 'deviceToken': '' , 'requested_ip' : ''};
  rememberedCredentials: any;
  IsfacebookObj: any = { 'userId': '' };
  token: any;
  plat: any;
  playerIds: any;

  constructor(private keyboard: Keyboard, private translate: TranslateService,private googlePlus: GooglePlus, private loadingScreen: LoadingScreenAppPage, private http: HttpClient, private modalController: ModalController, private platform: Platform, private loadCtr: LoadingController, private service: ServicesService, private Router: Router, private navController: NavController, private toastController: ToastController) {
  }

   ionViewDidEnter() {
    this.googleLoginObj.requested_ip = window.localStorage.getItem('L2TraveleSIM_IP') !=null? window.localStorage.getItem('L2TraveleSIM_IP') : '';
    this.appleLoginObj.requested_ip = window.localStorage.getItem('L2TraveleSIM_IP') !=null? window.localStorage.getItem('L2TraveleSIM_IP') : '';

  this.playerIds = window.localStorage.getItem('L2TraveleSIM_PLAYER_ID');
  if (this.playerIds != null) {
    this.googleLoginObj.deviceToken = this.playerIds;
    this.facebookObj.deviceToken = this.playerIds;
    this.loginObj.deviceToken = this.playerIds;
    this.appleLoginObj.deviceToken = this.playerIds;
  }
    // Load remembered credentials
    this.rememberedCredentials = window.localStorage.getItem('L2TraveleSIM_credentials');
    if (this.rememberedCredentials) {
      this.rememberedCredentials = JSON.parse(this.rememberedCredentials);
      this.loginObj.email = this.rememberedCredentials.email;
      this.loginObj.password = this.rememberedCredentials.password,
      this.rememberMe = true;
    }
  }

  userLanguage: any={'language' : ''};
    //Update user language 
    async updateUserLanguage(token:any)
    {
    this.service.updateUserLanguage(token, this.userLanguage).then((res: any) => {
        if (res.code == 200) {
           // Add languages to support
        const languageToSet = res.data.language || 'en';
        this.translate.addLangs(['en','ar']);
        // Set default language
        this.translate.setDefaultLang(languageToSet);
        this.translate.use(languageToSet);
        window.localStorage.setItem("L2TraveleSIM_language", languageToSet);

        }
      }).catch(err => {
    //    this.loadingScreen.dismissLoading();
      });
    } 

  
  
  ngOnInit() {
    
     //Notification Permission Popup 
     this.platform.ready().then(() => {
      if (this.platform.is('android') || this.platform.is('ios')) {
        OneSignalPlugin.setAppId('fff4239f-9ac8-4b82-a715-92df7445acf6');
      }
    });
    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.checkoutObj = this.tempDetails.checkoutData;
    this.allowPopupPushNoti();
    this.isLogin = this.tempDetails.withOutLogin;
     this.keyboard.hideFormAccessoryBar(false);
  }

  async allowPopupPushNoti() {
    const notiSetting = window.localStorage.getItem('eSIM_IsNotiSettingAllow');
    // Check if permission has not been previously granted
    if (notiSetting === 'no' || notiSetting === null) {
      if (this.platform.is('android') || this.platform.is('ios')) {
        // Prompt the user for push notification permission
        OneSignalPlugin.promptForPushNotificationsWithUserResponse((accepted) => {
          if (accepted) {
            window.localStorage.setItem('eSIM_IsNotiSettingAllow', 'yes');
  
            // Only fetch device token if the user has accepted
            this.getDeviceToken();
          }
        });
      }
    } else {
      // If permission was previously granted, directly fetch the device token
      this.getDeviceToken();
    }
  }

// Fetch the device token
getDeviceToken() {
  setTimeout(() => {
    OneSignalPlugin.getDeviceState((response) => {
      try {
        const storedPlayerId = window.localStorage.getItem('L2TraveleSIM_PLAYER_ID');
        const playerId = storedPlayerId ?? response.userId;

        if (playerId) {
          this.googleLoginObj.deviceToken = playerId;
          this.facebookObj.deviceToken = playerId;
          this.loginObj.deviceToken = playerId;
          this.appleLoginObj.deviceToken = playerId;
          window.localStorage.setItem('L2TraveleSIM_PLAYER_ID', playerId);
        }
      } catch (error) {
        console.error('Error fetching device token:', error);
      }
    });
  }, 500);
}  

  // Handle login submission
async submit() {
  if (this.validate()) {
    await this.loadingScreen.presentLoading();
    
    try {
      const credentials = JSON.stringify(this.loginObj);

      // Handle "Remember Me" functionality
      if (this.rememberMe) {
        window.localStorage.setItem('L2TraveleSIM_credentials', credentials);
      } else {
        window.localStorage.removeItem('L2TraveleSIM_credentials');
      }

      // API call for login
      const res: any = await this.service.loginService(this.loginObj);

      this.loadingScreen.dismissLoading();

      if (res.code === 200) {
        const userDetails = res.data[0]['data'];
        const authToken = res.data[0]['token'];
        // Fetch and store bundles after login
       this.userLanguage.language = window.localStorage.getItem("L2TraveleSIM_language") || 'en';
       this.updateUserLanguage(authToken); 
        // Store login-related information in localStorage
        window.localStorage.setItem('L2TraveleSIM_userDetails', JSON.stringify(userDetails));
        window.localStorage.setItem('L2TraveleSIM_auth_token', authToken);
        window.localStorage.setItem('L2TraveleSIM_loginType', "normal");
        window.localStorage.setItem('L2TraveleSIM_emailSettings', res.data[0]['promotion_email']);
        window.localStorage.setItem('L2TraveleSIM_promoSettings', res.data[0]['app_promotions']);
        window.localStorage.setItem('L2TraveleSIM_paymentSettings', res.data[0]['app_payment']);
        window.localStorage.setItem('L2TraveleSIM_serviceSettings', res.data[0]['app_service']);
        window.localStorage.setItem('L2TraveleSIM_user_wallets', userDetails['user_wallet']);
        window.localStorage.setItem('L2TraveleSIM_refer_balance', userDetails['referal_wallet']);
        window.localStorage.setItem('L2TraveleSIM_refer_code', userDetails['referal_code']);
        console.log(userDetails['user_wallet']);

        // Show success message
        this.successMSGModal(
          this.translate.instant('SUCCESS_MSG_BUTTON'), 
          this.translate.instant('SUCCESS_MSG_TEXT'), 
          "2000"
        );

        // Handle navigation based on login state
        if (this.isLogin) {
          const loginPageUrl = this.Router.url;
          this.checkoutObj.id = userDetails['id'];
          const navigationExtras: NavigationExtras = {
            state: {
              checkoutData: this.checkoutObj,
              withOutLogin: this.isLogin,
              payBack: loginPageUrl
            }
          };
          this.Router.navigate(['/payment-days'], navigationExtras);
        } else {
          this.Router.navigate(['home-search']);
        }
      } else {
        this.errorMSGModal(
          this.translate.instant('ERROR_MSG_BUTTON'), 
          this.translate.instant('ERROR_MSG_TEXT')
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      this.loadingScreen.dismissLoading();
      this.errorMSGModal(
        this.translate.instant('ERROR_MSG_BUTTON'), 
        this.translate.instant('ERROR_MSG_TEXT')
      );
    }
  }
}

  // Validation start
  validate() {
    let emailValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (this.loginObj.email.trim() == '' && this.loginObj.password.trim() == '') {
      this.errorMSGModal(this.translate.instant('VALIDATION_MSG_BUTTON'), this.translate.instant('VALIDATION_MSG_EMPTY_FIELDS'));
      return false;
    }
    else if (this.loginObj.email.trim() == '') {
      this.errorMSGModal(this.translate.instant('VALIDATION_MSG_BUTTON'), this.translate.instant('VALIDATION_MSG_EMPTY_EMAIL'));
      return false;
    }
    else if (!emailValid.test(this.loginObj.email) && (this.loginObj.email != '')) {
      this.errorMSGModal(this.translate.instant('VALIDATION_MSG_BUTTON'), this.translate.instant('VALIDATION_MSG_INVALID_EMAIL'));
      return false;
    }
    else if (this.loginObj.password.trim() == '') {
      this.errorMSGModal(this.translate.instant('VALIDATION_MSG_BUTTON'), this.translate.instant('VALIDATION_MSG_EMPTY_PASSWORD'));
      return false;
    }
    return true;
  }

  gotoBack() {
    this.navController.pop();
  }

  gotoRegister() {
    let navigationExtras: NavigationExtras = {
      state: {
        checkoutData: this.checkoutObj,
        withOutLogin: this.isLogin
      }
    };
    this.Router.navigate(['/create-account'], navigationExtras);
  }

  gotoForgotPass() {
    this.Router.navigate(['/forgot-password']);
  }

  hideShowPassword() {
    this.passwordType = this.passwordType == 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon == 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  clearInput() {
    this.loginObj.email = '';
    this.loginObj.password = '';
  }

  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }
  gotoTab5() {
    this.navController.navigateRoot('tab5');
  }
  gotoStart() {
    this.navController.navigateRoot('start');
  }

  // Error Modal
  async errorMSGModal(buttonText: any, msg: any) {
    const modal = await this.modalController.create({
      component: PasswordErrorPage,
      componentProps: { 'value': msg , 'value1': buttonText}
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  // Success Modal
  async successMSGModal(buttonText: any, msg: any, times: any) {
    const modal = await this.modalController.create({
      component: SuccessModelPage,
      componentProps: { 'value': msg, 'value1': buttonText, 'value2': times }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

   /* SIgn in with google  */
   async loginWithGoogle() {
   await this.loadingScreen.presentLoading();
      const options = {
        prompt: 'consent',
        // other options...
      };
  
 this.googlePlus.login(options)
        .then(res => {
         // alert("Success" + JSON.stringify(res))
          this.loadingScreen.dismissLoading();
          this.googleSuccess(res)
        })
        .catch(err => {
         // alert("Error" + JSON.stringify(err));
        //  this.errorMSGModal(this.translate.instant('ERROR_MSG_BUTTON'), this.translate.instant('ERROR_MSG_TEXT'));
          this.loadingScreen.dismissLoading();
         // alert("Error" + JSON.stringify(err))
        });  
    }
  
    googleAttemp:any;

    
    async googleSuccess(googleRes:any) {
      //API call for Login section
      await this.loadingScreen.presentLoading();
       this.googleLoginObj.userId = googleRes.userId;
      this.googleLoginObj.first_name = googleRes.givenName;
     this.googleLoginObj.email = googleRes.email;
      
      this.service.googleLogin(this.googleLoginObj).then((resNew: any) => {
        this.loadingScreen.dismissLoading();
        if (resNew['code'] == 200) {
          const authToken =  resNew.data['token'];
         // Fetch and store bundles after login

          this.userLanguage.language = window.localStorage.getItem("L2TraveleSIM_language") || 'en';
          this.updateUserLanguage(authToken); 
          window.localStorage.setItem('L2TraveleSIM_userDetails', JSON.stringify(resNew.data['data']));
          window.localStorage.setItem('L2TraveleSIM_auth_token', resNew.data['token']);
          this.googleAttemp = resNew.data['firstlogin'];
          window.localStorage.setItem('L2TraveleSIM_loginType', "google");
          window.localStorage.setItem('L2TraveleSIM_emailSettings',  resNew.data['promotion_email']);
          window.localStorage.setItem('L2TraveleSIM_promoSettings', resNew.data['app_promotions']);
          window.localStorage.setItem('L2TraveleSIM_paymentSettings', resNew.data['app_payment']);
          window.localStorage.setItem('L2TraveleSIM_serviceSettings', resNew.data['app_service']);
          window.localStorage.setItem('L2TraveleSIM_user_wallets', resNew.data['data']['user_wallet']);
          window.localStorage.setItem('L2TraveleSIM_refer_balance', resNew.data['data']['referal_wallet']);
          window.localStorage.setItem('L2TraveleSIM_refer_code', resNew.data['data']['referal_code']);
         
            //Already registered  
         if(resNew.data['is_register'] == false)
         {
        this.successMSGModal(this.translate.instant('SUCCESS_MSG_BUTTON'), this.translate.instant('SUCCESS_MSG_TEXT'), "4000");
         if (this.isLogin == true) {
            const loginPageUrl = this.Router.url;
            this.checkoutObj.id = resNew.data['id'];
            let navigationExtras: NavigationExtras = {
              state: {
                checkoutData: this.checkoutObj,
                withOutLogin: this.isLogin,
                payBack: loginPageUrl
              }
            };
            this.Router.navigate(['/payment-days'], navigationExtras);
          } else {
            this.Router.navigate(['home-search']);
          } 
         }else{
     //First time -SIGNUP- Google 
      //Socail Media Country Model STARTED 
     this.modelSocailCountry( resNew.data['id'],this.Router.url );
         }
  
        } else {
          this.errorMSGModal(this.translate.instant('ERROR_MSG_BUTTON'), this.translate.instant('ERROR_MSG_TEXT'));
        }
      })
  }

  async modelSocailCountry(userId: string, routeURL: string): Promise<void> {
  const modal = await this.modalController.create({
    component: SocailLoginCountryPhonePage, // fixed typo
  });

  modal.onDidDismiss().then((result) => {
    console.log('Modal result:', result);

    if (result.data.success == true) {

      this.successMSGModal(this.translate.instant('SUCCESS_MSG_BUTTON'), this.translate.instant('SUCCESS_MSG_TEXT_Wl'), "2000");

      this.checkoutObj.id = userId;

      const navigationExtras: NavigationExtras = {
        state: {
          checkoutData: this.checkoutObj,
          withOutLogin: this.isLogin,
          payBack: routeURL,
        },
      };

      this.Router.navigate(['signup-socialrefer'], navigationExtras);
    }
  });

  await modal.present();
}

}