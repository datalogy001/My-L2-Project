import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ModalRefercodePage } from '../modal-refercode/modal-refercode.page'; 
import { IonActionSheet, IonButton } from '@ionic/angular/standalone';
import { Router, NavigationExtras } from '@angular/router';
import { ZendeskService } from '../api/zendesk.service';
import { ServicesService } from '../api/services.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { TranslateService } from '@ngx-translate/core';
import { SuccessModelPage } from '../success-model/success-model.page';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedSegment: string = 'credit';
  notificationList: any = [];
  notiCount: any = 0;
  constructor(private loadingScreen: LoadingScreenAppPage,private modalCtrl: ModalController,private translate: TranslateService, private clipboard: Clipboard, private service: ServicesService,private zendeskService: ZendeskService,private Router: Router, private modalController: ModalController, private navCtrl: NavController) { }


	gotoMarketPlace()
	  {
	    this.navCtrl.navigateRoot('marketplace');
	  }


  ngOnInit() {
    
  }
  tempDetails:any=[]; 
  lang:any;
  tokenValue: any = '';
  currencyCode:any='USD';
  walletBalance:any=0.00;
  min_refer_amt:any=0.00;
     isWalletLoading: boolean = true;

  ionViewDidEnter() {
    //User Details 
      this.tempDetails = window.localStorage.getItem('L2TraveleSIM_userDetails');
      this.tempDetails = JSON.parse(this.tempDetails);
      this.shareObj.user_id= this.tempDetails.id;
     // Set default language if not found in local storage
       this.lang = window.localStorage.getItem("L2TraveleSIM_language") || 'en';

      // Check if tempDetails and first_name are defined
      if (this.tempDetails && typeof this.tempDetails.first_name === 'string') {
        // Normalize the first_name to lowercase to avoid multiple checks
        if (this.tempDetails.first_name.toLowerCase() === 'guest') {
          // Assign first_name based on selected language
          switch (this.lang) {
            case 'ar':
              this.tempDetails.first_name = 'ضيف';
              break;

            default:
              this.tempDetails.first_name = 'Guest';
              break;
          }
        }
      }
       //Current currency 
     if (window.localStorage.getItem("L2TraveleSIM_currency") == null) {
      this.currencyCode = 'USD';
    } else {
      this.currencyCode = window.localStorage.getItem("L2TraveleSIM_currency");
    }
     // this.walletBalance=window.localStorage.getItem('L2TraveleSIM_user_wallets');
      this.refer_balance=window.localStorage.getItem('L2TraveleSIM_refer_balance');
      this.refer_code=window.localStorage.getItem('L2TraveleSIM_refer_code');
      this.refer_code= this.capitalizeText(this.refer_code);
      this.tokenValue = window.localStorage.getItem('L2TraveleSIM_auth_token');
      console.log(this.refer_balance);
      this.getuserDetails();
       //Notifications
       this.getNotificationList();
  }

  capitalizeText(text: string): string {
    if (!text) return text;
    return text.toUpperCase();
  }
   async getuserDetails() {

  this.isWalletLoading = true;

  this.service.getuserDetails().then((res: any) => {

    if (res.code === 200 && res.data?.length > 0) {

      const data = res.data[0];

      this.walletBalance = data.wallet_balance;
      this.refer_balance = data.refere_balance;
      this.refer_code = this.capitalizeText(data.referal_code);
      this.shareAmount = data.refer_amount;
      this.min_refer_amt = data.min_refer_code_amont;
      this.tempDetails.profile_image = data.profile_image;
      // Credit history
      this.isCreditHistory = data.credit_history?.length > 0;
      this.creditHistory = this.isCreditHistory ? data.credit_history : [];
      // Refer history
      this.isReferHistory = data.refer_history?.length > 0;
      this.referHistory = this.isReferHistory ? data.refer_history : [];
      // Save to localStorage
      window.localStorage.setItem('L2TraveleSIM_user_wallets', data.wallet_balance);
      window.localStorage.setItem('L2TraveleSIM_refer_balance', data.refere_balance);
      window.localStorage.setItem('L2TraveleSIM_refer_code', this.refer_code);
    }

    // ✅ STOP loader after API response
    this.isWalletLoading = false;

  }).catch(err => {
    console.error(err);

    // ✅ Stop loader even if API fails
    this.isWalletLoading = false;
  });
}
    getFormattedAmount(amount: number, currency: string): string {
      const currencySymbols: { [key: string]: string } = {
       'USD': '$',
     'EUR': '€',
   'GBP': '£',
   'LYD': 'LD'
      };
      return currencySymbols[currency] ? `${currencySymbols[currency]}${amount}` : `${amount} ${currency}`;
    }
    
  async shareReferralcode() {
  
    console.log(this.shareAmount);
    const modal = await this.modalController.create({
      component: ModalRefercodePage,
      componentProps: { 'value': this.shareAmount , 'value1': this.refer_code, 'value2': this.min_refer_amt }
    });
  
    modal.onDidDismiss();
    return await modal.present();
  }

  referHistory:any=[]; 
  isReferHistory:any=true;
  shareAmount:any=0.00;
  shareObj:any={'user_id':''};

  //getShareAmount
  /*async getShareAmount() {
    //  await this.loadingScreen.presentLoading();
      this.service.getShareAmount(this.shareObj, this.tokenValue).then((res: any) => {
      //  this.loadingScreen.dismissLoading();
        if (res.code ==200) {
          
          this.shareAmount=res.data.referal_customer_bouns;
          console.log("this.shareAmount" + this.shareAmount);
        }
      }).catch(err => {
        this.shareAmount=0.00;
      })
  
    }
  //Get Refere History
  async getReferHistory() {
    //  await this.loadingScreen.presentLoading();
      this.service.getReferHistory(this.tokenValue).then((res: any) => {
      //  this.loadingScreen.dismissLoading();
        if (res.code == 200) {
          if (res.data.length > 0) {
            this.isReferHistory =true;
            this.referHistory = res.data;
          }
          else
          {
            this.isReferHistory =false;
            this.referHistory = [];
          }
        } else {
          this.referHistory = [];
          this.isReferHistory =false;
        }
      }).catch(err => {
        //this.loadingScreen.dismissLoading();
        this.referHistory = [];
          this.isReferHistory =false;
      })
  
    }
*/
  creditHistory:any=[]; 
  isCreditHistory:any=true;
  /*
  async getCreditHistory() {
  //  await this.loadingScreen.presentLoading();
    this.service.getCreditHistory(this.tokenValue).then((res: any) => {
    //  this.loadingScreen.dismissLoading();
      if (res.code == 200) {
        if (res.data.length > 0) {
          this.isCreditHistory =true;
          this.creditHistory = res.data;
        }
        else
        {
          this.isCreditHistory =false;
          this.creditHistory = [];
        }
      } else {
        this.creditHistory = [];
        this.isCreditHistory =false;
      }
    }).catch(err => {
      //this.loadingScreen.dismissLoading();
      this.creditHistory = [];
      this.isCreditHistory =false;
    })

  }
 */
  refer_balance:any=0.00;
  refer_code:any;

  //Goto Topup section

  gotoTopup()
  {
 this.Router.navigate(['/credit-topup']);
  }

  gotoRedeemVoucher()
  {
    this.Router.navigate(['/voucher-topup']);
  }

  async getNotificationList() {
    this.service.getNotificationList(this.tokenValue).then((res: any) => {
      if (res.code == 200) {
        if (res.data.readnotification.length > 0) {
          this.notificationList = res.data.readnotification;
          this.notiCount = res.data.unreadcount;
        }
        else
          this.notificationList = [];
      } else {
        this.notificationList = [];
      }
    }).catch(err => {
      this.notificationList = [];
    })

  }

  //Copy Refere code

  copyRefereCode() {
    console.log(this.refer_code);
    this.clipboard.copy(this.refer_code).then(
      () => {
        this.successMSGModal(this.translate.instant('SUCCESS_MSG'),this.translate.instant('SUCCESS_TITLE'),"1500");
      },
      (err) => {
        this.errorMSGModal(this.translate.instant('ERROR_TITLE'),this.translate.instant('ERROR_MSG'));
         }
    );
  }

   //Error Modal
    async errorMSGModal(buttonText:any, msg:any) {
      const modal = await this.modalCtrl.create({
        component: PasswordErrorPage,
        componentProps: { 'value': msg , 'value1': buttonText}
      });
  
      modal.onDidDismiss();
      return await modal.present();
    }

    //Success Modal
    async successMSGModal(buttonText: any, msg: any, times:any) {
      const modal = await this.modalCtrl.create({
        component: SuccessModelPage,
        componentProps: { 'value': msg, 'value1': buttonText, 'value2': times }
      });
  
      modal.onDidDismiss();
      return await modal.present();
    }

  gotoNoti() {
    let navigationExtras: NavigationExtras = {
      state: {
        notiData: this.notificationList,
      }
    };
    this.Router.navigate(['/notifications'], navigationExtras);
  }

  //Common Footers
  gotoTab1() {
    this.navCtrl.navigateRoot('tab1');
  }
  gototab5() {
    this.navCtrl.navigateRoot('tab5');
  }

  async gotoFAQ() {
    this.Router.navigate(['/faq']);
  }
  locale:any;
  async openZendeskChat() {
    /*await this.loadingScreen.presentLoading();
    setTimeout(() => {
      this.loadingScreen.dismissLoading();
    }, 300); */
    this.locale = window.localStorage.getItem("L2TraveleSIM_language") || 'en';
    this.zendeskService.loadZendesk(this.locale);
  }

  
}
