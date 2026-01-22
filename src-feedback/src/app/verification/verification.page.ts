
import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { Platform } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { debounceTime, Subject } from 'rxjs';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  @Input("value") value: any;
  @Input("value1") value1: any;
  @Input("value2") value2: any;
  @ViewChild('otp1') otp1Input: any;

  constructor(
    private loadingScreen: LoadingScreenAppPage,
    private router: Router,
    private loadCtr: LoadingController,
    private service: ServicesService,
    private modalCtrl: ModalController,
    private navController: NavController,
    private toastController: ToastController,
    private keyboard: Keyboard,
    private translate: TranslateService,
    
    private platform: Platform
  ) {}

  timer: number = 30; // Initial timer value in seconds
  interval: any;
  num1: any = '';
  num2: any = '';
  num3: any = '';
  num4: any = '';
  tempOTP: any = '';
  tempParam: any = [];
  otp: any = '';
  isDisabled: any = false;
  verifyObj: any = { 'name': '', 'email': '' };
  tempData: any = [];

  private otpInputChanged: Subject<void> = new Subject<void>();
  private isVerifying: boolean = false;

  ngOnInit() {
    //Recevied OTP value
    this.tempData = this.router.getCurrentNavigation()?.extras.state;
    this.otp = this.tempData.value;
    this.verifyObj.name = this.tempData.value2;
    this.verifyObj.email = this.tempData.value1;

    this.otpInputChanged.pipe(debounceTime(300)).subscribe(() => {
      this.validate();
    });
  }

  onPaste(event: ClipboardEvent, currentInput: any, ...nextInputs: any[]): void {
    event.preventDefault();

    const pastedText = event.clipboardData?.getData('text/plain') || '';
    const pastedDigits = pastedText.match(/\d/g);

    if (pastedDigits) {
      currentInput.value = pastedDigits[0];
      this.otp1Input.setFocus();
      this.num1 = pastedDigits[0];
      this.num2 = pastedDigits[1];
      this.num3 = pastedDigits[2];
      this.num4 = pastedDigits[3];
      for (let i = 1; i < pastedDigits.length && i <= nextInputs.length; i++) {
        nextInputs[i - 1].value = pastedDigits[i];
        setTimeout(() => {
          nextInputs[i - 1].setFocus();
        }, 0);
      }
      this.otpInputChanged.next();
    }
  }

  otpChange(event: any, next: any, prev: any, currentInput: any) {
    if (event.target.value.length < 1 && prev) {
      prev.setFocus();
      switch (currentInput) {
        case 'otp2':
          this.num1 = event.target.value;
          break;
        case 'otp3':
          this.num2 = event.target.value;
          break;
        case 'otp4':
          this.num3 = event.target.value;
          break;
        default:
          break;
      }
    } else if (next && event.target.value.length > 0) {
      next.setFocus();
    }

    const enteredCode = `${this.num1}${this.num2}${this.num3}${this.num4}`;
    if (enteredCode.length == 4) {
      this.otpInputChanged.next();
    }
  }

  validate() {
    if (this.isVerifying) {
      return;
    }

    const enteredCode = `${this.num1}${this.num2}${this.num3}${this.num4}`;
    if (enteredCode.trim() == '') {
      this.errorMSGModal(this.translate.instant("Ok"), this.translate.instant('VERIFY_EMAIL_ENTER_CODE_ERROR'));
      return false;
    }

    if (enteredCode != this.otp) {
      this.errorMSGModal(this.translate.instant('VERIFY_EMAIL_TRY_AGAIN'), this.translate.instant('VERIFY_EMAIL_CODE_INCORRECT'));
      return false;
    }

    this.keyboard.hide();
    this.isVerifying = true;
    this.createSuccess().finally(() => {
      this.isVerifying = false;
    });

    return true;
  }

  closePopover(values: any) {
    if (values == false) {
      this.navController.pop();
    } else {
      if (this.validate()) {
        this.keyboard.hide();
      }
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
     
  currencyCode:any;
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


  async createSuccess() {
    //API call for Create account section
    await this.loadingScreen.presentLoading();
    // this.tempData.registerObj.last_name = this.tempData.registerObj.first_name;
    this.service.createAccount(this.tempData.registerObj).then((res: any) => {
      this.loadingScreen.dismissLoading();
      if (res.code == 200) {
      
        this.userLanguage.language = window.localStorage.getItem("L2TraveleSIM_language") || 'en';
        this.updateUserLanguage(res.data[0]['token']); 
        window.localStorage.setItem('L2TraveleSIM_userDetails', JSON.stringify(res.data[0]['data']));
        window.localStorage.setItem('L2TraveleSIM_auth_token', res.data[0]['token']);
        window.localStorage.setItem('L2TraveleSIM_loginType', "normal");
        window.localStorage.setItem('L2TraveleSIM_emailSettings', res.data[0]['promotion_email']);
        window.localStorage.setItem('L2TraveleSIM_promoSettings', res.data[0]['app_promotions']);
        window.localStorage.setItem('L2TraveleSIM_paymentSettings', res.data[0]['app_payment']);
        window.localStorage.setItem('L2TraveleSIM_serviceSettings', res.data[0]['app_service']);
        window.localStorage.setItem('L2TraveleSIM_user_wallets',res.data[0]['data']['user_wallet']);
        window.localStorage.setItem('L2TraveleSIM_refer_balance',res.data[0]['data']['referal_wallet']);
        window.localStorage.setItem('L2TraveleSIM_refer_code', res.data[0]['data']['referal_code']);
       window.localStorage.setItem('L2TraveleSIM_user_country', res.data[0]['data']['country_iso']);
       this.currencyCode = this.resolveCurrency(res.data[0]['data']['country_iso']);
       window.localStorage.setItem('L2TraveleSIM_currency', this.currencyCode);

        this.successMSGModal(this.translate.instant('VERIFY_EMAIL_SUCCESS_TITLE'), this.translate.instant('VERIFY_EMAIL_SUCCESS_MESSAGE'), "2000");
        this.tempData.checkoutObj.id = res.data[0]['data']['id'];
        let navigationExtras: NavigationExtras = {
          state: {
            checkoutData: this.tempData.checkoutObj,
            withOutLogin: this.tempData.isLogin
          }
        };
        this.router.navigate(['/account-created'], navigationExtras);

      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
      this.errorMSGModal(this.translate.instant('VERIFY_EMAIL_TRY_AGAIN'), this.translate.instant('VERIFY_EMAIL_SIGNUP_ERROR'));
    });
  }

  //Retry code 
  async retryCode() {
    this.num1 = '';
    this.num2 = '';
    this.num3 = '';
    this.num4 = '';
    this.otp = '';
    this.tempOTP = '';
    //Call API to get New code 
    await this.loadingScreen.presentLoading();
    this.service.verifyAccount(this.verifyObj).then((res: any) => {
      this.loadingScreen.dismissLoading();
      if (res.code == 200) {
        this.successMSGModal(this.translate.instant('VERIFY_EMAIL_RESEND_MESSAGE_TITLE'), this.translate.instant('VERIFY_EMAIL_RESEND_MESSAGE_BODY'), "2000");
        this.otp = res.data.OTP;
      } else {
        this.errorMSGModal(this.translate.instant("Ok"), res.message);
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
      this.errorMSGModal(this.translate.instant('VERIFY_EMAIL_TRY_AGAIN'), this.translate.instant('VERIFY_EMAIL_ERROR_MESSAGE'));
    });
  }

  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }
  gotoTab5() {
    this.navController.navigateRoot('tab5');
  }

  //Error Modal
  async errorMSGModal(buttonText: any, msg: any) {
    const modal = await this.modalCtrl.create({
      component: PasswordErrorPage,
      componentProps: { 'value': msg, 'value1': buttonText }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  //Success Modal
  async successMSGModal(buttonText: any, msg: any, times: any) {
    const modal = await this.modalCtrl.create({
      component: SuccessModelPage,
      componentProps: { 'value': msg, 'value1': buttonText, 'value2': times }
    });

    modal.onDidDismiss();
    return await modal.present();
  }
}
