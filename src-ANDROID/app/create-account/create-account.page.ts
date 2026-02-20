import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core'
import { Platform, NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { TermsPage } from '../terms/terms.page';
import { VerificationPage } from '../verification/verification.page';
import { ServicesService } from '../api/services.service';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import OneSignalPlugin from 'onesignal-cordova-plugin'
import { PasswordErrorPage } from '../password-error/password-error.page';
import { PasswordErrorModelPage } from '../password-error-model/password-error-model.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { TranslateService } from '@ngx-translate/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ModalCodenotworkPage } from '../modal-codenotwork/modal-codenotwork.page';
import { CountryCodeModelPage} from '../country-code-model/country-code-model.page';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';
 import {SocailLoginCountryPhonePage} from '../socail-login-country-phone/socail-login-country-phone.page';



@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  @ViewChild('searchDiv', { static: true }) searchDiv!: ElementRef;
   @ViewChild(IonContent, { static: false }) content?: IonContent;
  registerObj: any = { 'country_iso' : '', 'promotion_email' : false, 'referal_code': '', 'mobile_number' : '', 'country_name' : '',  'city':'','first_name': '', 'last_name': '', 'password': '', 'email': '', 'isPrivacySelected': false, 'isTermsSelected': false, 'confirmPass': '', 'deviceToken': '' ,'lang' : ''};
  terms: any = [];
  privacy: any = [];
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';
  passwordType1: string = 'password';
  passwordIcon1: string = 'eye-off-outline';
  isearchIMg: any;
  searchTerm: string = '';
  searchData: any = [];
  searchIMg: any;
  isSearch: any = false;
   countryCodeObj: any = {
    flag: '',
    code: ''
  };
    // Declare as a class property
  private phoneUtil = PhoneNumberUtil.getInstance();
  
  currencyCode: any = '';
  tempDetails: any = [];
  checkoutObj: any = [];
  isLogin: any = '';
  receivedOtp: any = '';
  verifyObj: any = { 'name': '', 'email': '' };
  googleLoginObj: any = { 'userId': '', 'first_name': '', 'email': '', 'deviceToken': '', 'lang' : '',  'requested_ip' : '' };
  facebookObj: any = { 'userId': '', 'first_name': '', 'email': '', 'deviceToken': '', 'lang' : '',  'requested_ip' : '' };
  appleLoginObj: any = { 'apple_id': '', 'first_name': '', 'email': '', 'deviceToken': '' , 'lang' : '',  'requested_ip' : ''};
  plat: any;
  playerIds: any;
  IsfacebookObj: any = { 'userId': '' };
;


  // Inject services and controllers
  constructor(private eRef: ElementRef,private translate: TranslateService, private googlePlus: GooglePlus,
    private loadingScreen: LoadingScreenAppPage,
    private platform: Platform,
    private loadCtr: LoadingController,
    private service: ServicesService,
    public popoverController: PopoverController,
    private Router: Router,
    private navController: NavController,
    private toastController: ToastController,
    private modalController: ModalController,
    private keyboard: Keyboard) { }

  // Toggle password visibility
  hideShowPassword() {
    this.passwordType = this.passwordType == 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon == 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  hideShowPassword1() {
    this.passwordType1 = this.passwordType1 == 'text' ? 'password' : 'text';
    this.passwordIcon1 = this.passwordIcon1 == 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  validateName(event: any, type: string) {
    const inputValue = event.target.value;
    // Regular expression to match any digit
    const regex = /\d/;
  
    // Check if the input contains any digits
    if (regex.test(inputValue)) {
      // If it contains digits, remove them from the input
      event.target.value = inputValue.replace(regex, '');
      // Update the model value accordingly
      if (type === 'first') {
        this.registerObj.first_name = event.target.value;
      } else {
        this.registerObj.last_name = event.target.value;
      }
    }
  }

  //CODE STARTED FOR REGISTER
  langDefault: any;
  iso:any;

   onClearSearch() {
    this.isSearch = false;
    this.searchTerm = '';
    this.iso = '';
    this.isearchIMg = '';
    this.searchData = this.tempCountry;
    this.temp_mobile_number =''; 
    this.isCountrySelected =false;
     this.countryCodeObj = {};
    this.searchDiv.nativeElement.classList.remove('searching');
  }

 // Show list on focus
  onFocusSearch() {
    this.isSearch = true;
    this.onFocus();
    this.searchData = this.tempCountry;
  }

   onFocus() {
    setTimeout(() => {
      this.content?.scrollToPoint(0, 300, 300); // Scroll to a specific point
    }, 300);
  }

  
 // Detect click outside this component or on any ion-input
  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const target = event.target as HTMLElement;

    // Close if click is outside this component
    const clickedOutside = !this.eRef.nativeElement.contains(target);

    // Close if clicked on another ion-input
    const clickedOtherInput = target.tagName.toLowerCase() === 'ion-input' ||
                              target.closest('ion-input') !== null;

    if (clickedOutside || clickedOtherInput) {
      this.isSearch = false;
    }
  }


 findMatchingItems(searchTerm: string): any[] {
  // normalize input (lowercase + remove spaces)
  const normalizedSearch = searchTerm.toLowerCase().replace(/\s+/g, "");

  const matchingItems = this.countryListWithCodes.filter((item: any) => {
    const normalizedName = item.country_name.toLowerCase().replace(/\s+/g, "");
    return normalizedName.startsWith(normalizedSearch);
  });

  // Ensure uniqueness by country name
  const uniqueItemsMap = new Map<string, any>();
  matchingItems.forEach((item: any) => {
    uniqueItemsMap.set(item.country_name, item);
  });

  return Array.from(uniqueItemsMap.values());
}

  temp_mobile_number: any = '';

onSearchMobile(event: any) {
  const inputValue: string = event.target.value || '';
  this.temp_mobile_number = inputValue.replace(/\D/g, ''); // digits only
}

  onSearch(event: any) {
     this.onFocus();
    const searchTerm: string = event.target.value;
    this.searchData = this.tempCountry;
    console.log(JSON.stringify(this.searchData));
  if (searchTerm) {
      this.searchData = this.findMatchingItems(searchTerm);
     this.isSearch = true;
    } else {
      this.isearchIMg = '';
      this.isSearch = false;
      this.isCountrySelected =false;
      this.searchDiv.nativeElement.classList.remove('searching');
    }
  }
  isCountrySelected:any =false;

 gotoSelect(countryRES: any) {
  this.isSearch = false;
  this.isearchIMg = countryRES.short_name;
  this.searchTerm = countryRES.country_name;
  this.searchDiv.nativeElement.classList.add('searching');
  this.isCountrySelected = true;
  this.registerObj.country_iso = countryRES.short_name;
  console.log(this.registerObj.country_iso);
  this.registerObj.country_name = countryRES.country_name;
  this.countryCodeObj.code = countryRES.phone_code;
  this.countryCodeObj.flag = countryRES.short_name;

  console.log(JSON.stringify(countryRES));
}



    async chooseCountry() {
      const modal = await this.modalController.create({
        component: CountryCodeModelPage,
        componentProps: { value: this.tempCountry}
      });
  
      modal.onDidDismiss().then((result: any) => {
        if (result.data.data != '') {
          this.countryCodeObj.code = result.data.data.phone_code;
          this.countryCodeObj.flag = result.data.data.short_name;
        }
  
      });
  
      return await modal.present();
    }

  // Initialize component
  ngOnInit() {
    
    this.registerObj.city = window.localStorage.getItem('L2TraveleSIM_city') || '' ;
    this.googleLoginObj.lang = window.localStorage.getItem("L2TraveleSIM_language");
    this.facebookObj.lang = window.localStorage.getItem("L2TraveleSIM_language");
    this.registerObj.lang = window.localStorage.getItem("L2TraveleSIM_language");
    this.appleLoginObj.lang = window.localStorage.getItem("L2TraveleSIM_language");
    this.googleLoginObj.requested_ip = window.localStorage.getItem('L2TraveleSIM_IP') !=null? window.localStorage.getItem('L2TraveleSIM_IP') : '';
    this.appleLoginObj.requested_ip = window.localStorage.getItem('L2TraveleSIM_IP') !=null? window.localStorage.getItem('L2TraveleSIM_IP') : '';

    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.checkoutObj = this.tempDetails.checkoutData;
    this.isLogin = this.tempDetails.withOutLogin;
    this.loadCountries();
    this.termsCondition();
    this.privacyPolicies();
      // Show the accessory bar with the "Done" button
      this.keyboard.hideFormAccessoryBar(false);

      // Listen for the keyboard's 'done' button event
      /*this.keyboard.onKeyboardHide().subscribe(() => {
        this.onDoneButton();
      }); */
  }

  /*onDoneButton() {
    // Handle the 'Done' button click event
    // Close the keyboard programmatically
    this.keyboard.hide();
    this.submit();
} */

  ionViewDidEnter() {
    this.playerIds = window.localStorage.getItem('L2TraveleSIM_PLAYER_ID');
    if (this.playerIds != null) {
      this.googleLoginObj.deviceToken = this.playerIds;
      this.facebookObj.deviceToken = this.playerIds;
      this.registerObj.deviceToken = this.playerIds;
      this.appleLoginObj.deviceToken = this.playerIds;
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
      
 
      EU_COUNTRIES = [
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR',
  'HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK',
  'SI','ES','SE'
];

resolveCurrency(countryCode: string): string {

  console.log("countrycide" +  JSON.stringify(countryCode));
  if (countryCode === 'LY') {
    return 'LYD';
  }

  if (countryCode == 'GB') {
    return 'GBP';
  }

  if (this.EU_COUNTRIES.includes(countryCode)) {
    return 'EUR';
  }

  return 'USD';
}


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
      window.localStorage.setItem('L2TraveleSIM_user_country', resNew.data['data']['country_iso']);
      console.log("1" +resNew.data['data']['country_iso'] );
       this.currencyCode = this.resolveCurrency(resNew.data['data']['country_iso']);
       console.log("2" +this.currencyCode );
      window.localStorage.setItem('L2TraveleSIM_currency', this.currencyCode);
      
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
       // Set OneSignal tag to identify that user has completed signup
      if (this.platform.is('cordova')) {
        OneSignalPlugin.sendTag("signed_up", "true");
      }
      //End


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
      this.checkoutObj.id = userId;
      this.successMSGModal(this.translate.instant('SUCCESS_MSG_BUTTON'), this.translate.instant('SUCCESS_MSG_TEXT_Wl'), "2000");
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
   
  // Fetch privacy policies from service
  privacyPolicies() {
    this.service.getPrivacyPolicies().then((res: any) => {
      if (res.code == 200) {
        this.privacy = res.data[0];
      } else {
        this.privacy = [];
      }
    }).catch(err => {
      console.error('Error fetching privacy policies:', err);
    })
  }


countryListWithCodes: any[] = [];
tempCountry: any[] = [];

// Fetch list of countries
loadCountries(): void {
  this.service.listOfCountriesForResidence()
    .then((response: any) => {
      if (response?.status === 200 && Array.isArray(response.data)) {
        const countries = response.data;
        this.countryListWithCodes = countries;
        this.tempCountry = countries;
        console.log(JSON.stringify(this.tempCountry));
      } else {
        this.countryListWithCodes = [];
        this.tempCountry = [];
        console.warn('Unexpected response structure:', response);
      }
    })
    .catch((error) => {
      console.error('Error fetching list of countries:', error);
      this.countryListWithCodes = [];
      this.tempCountry = [];
    });
}


  // Fetch terms and conditions from service
  termsCondition() {
    this.service.gettermsandCond().then((res: any) => {
      if (res.code == 200) {
        this.terms = res.data[0];
      } else {
        this.terms = [];
      }
    }).catch(err => {
      console.error('Error fetching terms and conditions:', err);
    })
  }

  // Navigate to different pages
  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }

  gotoTab5() {
    this.navController.navigateRoot('tab5');
  }

  gotoHomeSearch() {
    this.navController.navigateRoot('home-search');
  }

  gotoBack() {
    this.navController.pop();
  }

  // Clear input field
  clearInput() {
    this.registerObj.email = '';
  }

  // Navigate to login page
  gotoLogin() {
    let navigationExtras: NavigationExtras = {
      state: {
        checkoutData: this.checkoutObj,
        withOutLogin: this.isLogin
      }
    };
    this.Router.navigate(['/login'], navigationExtras);
  }

  referObj:any={'referal_code' : ''};

  async gotoVerificationOTP()
  {
  await this.loadingScreen.presentLoading();
  this.verifyObj.name = this.registerObj.first_name;
  this.verifyObj.email = this.registerObj.email;
  this.service.verifyAccount(this.verifyObj).then((res: any) => {
    this.loadingScreen.dismissLoading();
    if (res.code == 200) {
      this.successMSGModal(this.translate.instant('VALIDATION_MSG_EMAIL_SENT'), this.translate.instant('VALIDATION_MSG_EMAIL_SENT_DESCRIPTION'), "2000");
      this.receivedOtp = res.data.OTP;
      this.sendOTPTOModel(this.receivedOtp);
    } else {

      this.errorMSGModal(res.message, this.translate.instant('VALIDATION_MSG_BUTTON_TRY_AGAIN'));
    }
  }).catch(err => {
    this.loadingScreen.dismissLoading();

    this.errorMSGModal( this.translate.instant('VALIDATION_MSG_EMAIL_ALREADY_REGISTERED'),this.translate.instant('VALIDATION_MSG_BUTTON_TRY_AGAIN'));
  })
}

  // Validate form inputs
  async submit() {
    if (this.validate()) {
      // If refere code added 
      this.registerObj.mobile_number = this.countryCodeObj.code + this.temp_mobile_number;

      console.log(JSON.stringify(this.registerObj));
      if(this.registerObj.referal_code !='' &&   this.registerObj.referal_code !=null)
      {
        await this.loadingScreen.presentLoading();
        this.referObj.referal_code= this.registerObj.referal_code ;
        
        this.service.validate_refer_code(this.referObj).then((res: any) => {
          this.loadingScreen.dismissLoading();
          if (res.success == true) {
               this.gotoVerificationOTP();
          } else {
           // Error Model Start
           this.errorCodeMSGModal( this.translate.instant("code_didn't_work"),this.translate.instant('CONTINUE'));
           //End 

          }
        }).catch(err => {
          this.referObj.referal_code ='';
          this.registerObj.referal_code='';
          this.loadingScreen.dismissLoading();
          this.errorMSGModal( this.translate.instant('ERROR_MESSAGE'),this.translate.instant('VALIDATION_MSG_BUTTON_TRY_AGAIN'));
        })

      }else
      {

      await this.loadingScreen.presentLoading();
      this.verifyObj.name = this.registerObj.first_name;
      this.verifyObj.email = this.registerObj.email;
      this.service.verifyAccount(this.verifyObj).then((res: any) => {
        this.loadingScreen.dismissLoading();
        if (res.code == 200) {
          this.successMSGModal(this.translate.instant('VALIDATION_MSG_EMAIL_SENT'), this.translate.instant('VALIDATION_MSG_EMAIL_SENT_DESCRIPTION'), "2000");
          this.receivedOtp = res.data.OTP;
          this.sendOTPTOModel(this.receivedOtp);
        } else {

          this.errorMSGModal(res.message, this.translate.instant('VALIDATION_MSG_BUTTON_TRY_AGAIN'));
        }
      }).catch(err => {
        this.loadingScreen.dismissLoading();

        this.errorMSGModal( this.translate.instant('VALIDATION_MSG_EMAIL_ALREADY_REGISTERED'),this.translate.instant('VALIDATION_MSG_BUTTON_TRY_AGAIN'));
      })
    }
  }
  }

  // Navigate to verification page with OTP
  async sendOTPTOModel(otpcode: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        value: this.receivedOtp,
        value1: this.verifyObj.email,
        value2: this.verifyObj.name,
        isLogin: this.isLogin,
        checkoutObj: this.checkoutObj,
        registerObj: this.registerObj
      }
    };
    this.Router.navigate(['/verification'], navigationExtras);
  }



validate() {
  const emailValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  const passwordValid = /^(?=.*[A-Z])(?=.*[\W_])(?=.{6,}).*$/;

  // ---- FIRST NAME ----
  if (!this.registerObj.first_name || this.registerObj.first_name.trim() === '') {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_ENTER_FIRST_NAME'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  } else if (this.registerObj.first_name.trim().length < 3) {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_FIRST_NAME_MIN_LENGTH'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  }

  // ---- LAST NAME ----
  if (!this.registerObj.last_name || this.registerObj.last_name.trim() === '') {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_ENTER_SURNAME'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  } else if (this.registerObj.last_name.trim().length < 3) {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_SURNAME_MIN_LENGTH'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  }

  // ---- EMAIL ----
  if (!this.registerObj.email || this.registerObj.email.trim() === '') {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_ENTER_EMAIL'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  } else if (!emailValid.test(this.registerObj.email)) {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_ENTER_VALID_EMAIL'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  }

  // ---- PASSWORD ----
  if (!this.registerObj.password || this.registerObj.password.trim() === '') {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_ENTER_PASSWORD'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  } else if (!passwordValid.test(this.registerObj.password)) {
    this.loadingScreen.dismissLoading();
    this.errorMSGPASSWORDModal(this.translate.instant('VALIDATION_MSG_INVALID_PASSWORD'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  }

  if (!this.registerObj.confirmPass || this.registerObj.confirmPass.trim() === '') {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_CONFIRM_PASSWORD'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  } else if (this.registerObj.password !== this.registerObj.confirmPass) {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_PASSWORD_MISMATCH'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  }

  // ---- COUNTRY ----
  if (!this.registerObj.country_name || this.registerObj.country_name.trim() === '') {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_SELECT_COUNTRY'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  }

  // ---- MOBILE NUMBER (libphonenumber) ----
  if (!this.temp_mobile_number || this.temp_mobile_number.trim() === '') {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_ENTER_MOBILE_NUMBER'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  }

 try {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const rawInput = this.temp_mobile_number.trim();

  // Ensure number has '+' and country code
  let cleaned = rawInput.startsWith('+')
    ? rawInput
    : `+${this.countryCodeObj.code.replace('+', '')}${rawInput.replace(/[^\d]/g, '')}`;

  const parsedNumber = phoneUtil.parseAndKeepRawInput(cleaned);

  if (phoneUtil.isValidNumber(parsedNumber)) {
    this.registerObj.mobile_number = phoneUtil.format(parsedNumber, PhoneNumberFormat.E164);
  } else {
    throw new Error('Invalid mobile number');
  }
} catch (err) {
  console.error('Mobile validation error:', err);
  this.loadingScreen.dismissLoading();
  this.errorMSGModal(
    this.translate.instant('VALIDATION_MSG_ENTER_VALID_MOBILE_NUMBER'),
    this.translate.instant('VALIDATION_MSG_BUTTON_OK')
  );
  return false;
}


  // ---- PRIVACY & TERMS ----
  if (!this.registerObj.isPrivacySelected && !this.registerObj.isTermsSelected) {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_ACCEPT_PRIVACY_TERMS'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  } else if (!this.registerObj.isPrivacySelected) {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_ACCEPT_PRIVACY'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  } else if (!this.registerObj.isTermsSelected) {
    this.loadingScreen.dismissLoading();
    this.errorMSGModal(this.translate.instant('VALIDATION_MSG_ACCEPT_TERMS'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
    return false;
  }

  // ✅ All validations passed
  return true;
}


  // Open privacy policy modal
  async changePrivacyPolicies() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyPage,
      componentProps: { value: this.privacy }
    });
    return await modal.present();
  }

  // Open terms and conditions modal
  async changeTermsPopover() {
    const modal = await this.modalController.create({
      component: TermsPage,
      componentProps: { value: this.terms }
    });

    return await modal.present();
  }

  // Display success message modal
  async successMSGModal(header: string, message: string, time: any) {
    const modal = await this.modalController.create({
      component: SuccessModelPage,
      componentProps: {
        'value': header,
        'value1': message,
        'value2': time
      }
    });
    await modal.present();
  }

    // Display error message modal for Password 
  async errorMSGPASSWORDModal(header: string, message: string) {
    console.log(header);
    console.log(message);
    const modal = await this.modalController.create({
      component: PasswordErrorModelPage,
      componentProps: {
        'value': header,
        'value1': message,
      }
    });
    await modal.present();
  }

   // Display error message modal for Password 
   async errorCodeMSGModal(header: string, message: string) {
    console.log(header);
    console.log(message);
    const modal = await this.modalController.create({
      component: ModalCodenotworkPage ,
      componentProps: {
        'value': header,
        'value1': message,
      }
    });
    await modal.present();
  }


  // Display error message modal
  async errorMSGModal(header: string, message: string) {
    console.log(header);
    console.log(message);
    const modal = await this.modalController.create({
      component: PasswordErrorPage,
      componentProps: {
        'value': header,
        'value1': message,
      }
    });
    await modal.present();
  }

  // Navigate to privacy policy page
  async gotoPrivacy() {
    let navigationExtras: NavigationExtras = {
      state: {
        privacy: this.privacy,
      }
    };
    this.Router.navigate(['/privacy'], navigationExtras);
  }

  // Navigate to terms and conditions page
  async gotoTerms() {
    let navigationExtras: NavigationExtras = {
      state: {
        terms: this.terms,
      }
    };
    this.Router.navigate(['/terms-conditions'], navigationExtras);
  }

  async gotoCodenotworking() {
      const modal = await this.modalController.create({
        component: ModalCodenotworkPage
      });
  
      modal.onDidDismiss();
      return await modal.present();
    }

}
