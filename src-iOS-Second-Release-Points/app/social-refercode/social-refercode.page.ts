import { RefercodeAddedPage } from '../refercode-added/refercode-added.page';
import { Component, OnInit, } from '@angular/core';
import { Platform, NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import { HttpClient, HttpParams } from '@angular/common/http'
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { TranslateService } from '@ngx-translate/core';
import { ModalCodenotworkPage } from '../modal-codenotwork/modal-codenotwork.page';

@Component({
  selector: 'app-social-refercode',
  templateUrl: './social-refercode.page.html',
  styleUrls: ['./social-refercode.page.scss'],
})
export class SocialRefercodePage implements OnInit {
  constructor( private translate: TranslateService, private loadingScreen: LoadingScreenAppPage, private http: HttpClient, private modalController: ModalController, private platform: Platform, private loadCtr: LoadingController, private service: ServicesService, private Router: Router, private navController: NavController, private toastController: ToastController) {
  }
  tempDetails:any=[]; 
  checkoutObj:any=[]; 
  isLogin:any;
  loginPageUrl:any;
  earnObj:any= {'user_id' : '', 'referer_code' : ''};
  referObj:any={'referer_code' : ''};
  currencyCode:any='USD';
  tempUserData:any=[];
  ngOnInit() {
       //Current currency 
       if (window.localStorage.getItem("L2TraveleSIM_currency") == null) {
        this.currencyCode = 'USD';
      } else {
        this.currencyCode = window.localStorage.getItem("L2TraveleSIM_currency");
      }

    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.checkoutObj = this.tempDetails.checkoutData;
    this.tempUserData = window.localStorage.getItem('L2TraveleSIM_userDetails');
    this.tempUserData = JSON.parse(this.tempUserData);
    console.log(JSON.stringify(this.tempUserData));
    this.earnObj.user_id = this.tempUserData.id;
    this.isLogin = this.tempDetails.withOutLogin;
    this.loginPageUrl =  this.tempDetails.payBack
  }

  // Validate form inputs
  async submit() {
    if (this.validate()) {
      // If refere code added 
        await this.loadingScreen.presentLoading();
        this.service.validate_refer_code(this.referObj).then((res: any) => {
          
          if (res.success == true) {
               //Second API calling 
               this.earnObj.referer_code = this.referObj.referer_code;
                this.earnWallet();
               //End
          } else {
           // Error Model Start
           this.loadingScreen.dismissLoading();
           this.errorMSGModal( this.translate.instant("code_didn't_work"),this.translate.instant('CONTINUE'));
           //End 
          }
        }).catch(err => {
          this.loadingScreen.dismissLoading();
          this.errorMSGModal( this.translate.instant('ERROR_MESSAGE'),this.translate.instant('VALIDATION_MSG_BUTTON_TRY_AGAIN'));
        })
  }
  }

  async earnWallet()
  {
    console.log(JSON.stringify(this.earnObj));
    this.service.earnWalletRefer(this.earnObj).then((res: any) => {
      if (res.success == true) {
        this.loadingScreen.dismissLoading();
        window.localStorage.setItem('L2TraveleSIM_user_wallets', res.userData.user_wallet);
        console.log("Hi I m in");
        this.successRefereAdded(this.translate.instant("refer_code_added"),this.translate.instant('refer_code_added_desc'), this.translate.instant('your_account'),res.userData.credited_amount);
      } else {
       // Error Model Start
       this.loadingScreen.dismissLoading();
       this.errorMSGModal( this.translate.instant("code_didn't_work"),this.translate.instant('CONTINUE'));
       //End 
      }
    }).catch(err => {
      this.loadingScreen.dismissLoading();
      this.errorMSGModal( this.translate.instant("code_didn't_work"),this.translate.instant('CONTINUE'));
    })
  }

    gotoBack()
    {
    this.navController.pop();
    }

   // Validation function for form fields
   validate() {
      if (this.referObj.referer_code.trim() == '') {
        this.errorMSGModal(this.translate.instant('validate_referral_code'), this.translate.instant('VALIDATION_MSG_BUTTON_OK'));
        return false;
      }
      return true;
    }

      // Display error message modal
      async errorMSGModal(header: string, message: string) {
        console.log(header);
        console.log(message);
        const modal = await this.modalController.create({
          component: ModalCodenotworkPage,
          componentProps: {
            'value': header,
            'value1': message,
          }
        });
        await modal.present();
      }

      async successRefereAdded(v1: any, v2: any, v3: any, v4: any) {
        console.log("Success: Referral Added");
      
        const modal = await this.modalController.create({
          component: RefercodeAddedPage,
          componentProps: {
            value: v1,
            value1: v2,
            value2: v3,
            value3: v4
          }
        });
      
        await modal.present(); // Ensure the modal is fully presented before proceeding
      
        const { data } = await modal.onDidDismiss(); // Await dismissal for cleaner flow
      
        if (this.isLogin) {  // No need to check == true explicitly
          const navigationExtras: NavigationExtras = {
            state: {
              checkoutData: this.checkoutObj || {}, // Ensure it’s not undefined
              withOutLogin: this.isLogin,
              payBack: this.loginPageUrl || '' // Provide a default value
            }
          };
          this.Router.navigate(['/payment-days'], navigationExtras);
        } else {
          this.Router.navigate(['home-search']);
        }
      }
      
      skip()
      {
         
        if (this.isLogin) {  // No need to check == true explicitly
          const navigationExtras: NavigationExtras = {
            state: {
              checkoutData: this.checkoutObj || {}, // Ensure it’s not undefined
              withOutLogin: this.isLogin,
              payBack: this.loginPageUrl || '' // Provide a default value
            }
          };
          this.Router.navigate(['/payment-days'], navigationExtras);
        } else {
          this.Router.navigate(['home-search']);
        }
      }


}
