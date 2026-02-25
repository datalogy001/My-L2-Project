import { Component, OnInit, Input } from '@angular/core';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform, NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PasswordErrorPage } from '../password-error/password-error.page';

@Component({
  selector: 'app-modal-refercode',
  templateUrl: './modal-refercode.page.html',
  styleUrls: ['./modal-refercode.page.scss'],
})
export class ModalRefercodePage implements OnInit {
  textMsg: any = '';
  @Input("value") value: any;
  @Input("value1") value1: any;
  @Input("value2") value2: any;
  tempDetails:any=[];
  currencyCode:any='USD';

  closePopover(values: any) {
    this.modalCtrl.dismiss();
  }
 
   constructor(private translate: TranslateService,private loadingScreen: LoadingScreenAppPage, private Router: Router, private platform: Platform, private socialSharing: SocialSharing, private modalCtrl: ModalController, private toastcntr: ToastController) { }
 
   lang:any;
   ngOnInit() {
     this.lang = window.localStorage.getItem("L2TraveleSIM_language") || 'en';
    if (window.localStorage.getItem("L2TraveleSIM_currency") == null) {
      this.currencyCode = 'USD';
    } else {
      this.currencyCode = window.localStorage.getItem("L2TraveleSIM_currency");
    }
    const currencySymbol = this.currencySymbols[this.currencyCode] || this.currencyCode;
    this.translate.get('REF_UPDATE_MSG', { 
      currency: currencySymbol, 
      amount: this.value, 
      purchase_amount: this.value2
    }).subscribe((translatedText: string) => {
      console.log(translatedText);
      this.referralMessage = translatedText;
    });

   }
   platformWiseShareMSG:any; 
   referralMessage:any;
   currencySymbols: { [key: string]: string } = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'LYD': 'LD'
  };
   async sharewithall() {
    // Determine the platform-specific message key
    const messageKey = 'share_refer_code_msg_android';
  
    // Get the translated message with the referral code dynamically replaced
    this.translate.get(messageKey, { refer_code: this.value1 }).subscribe((translatedMessage: string) => {
      if (!translatedMessage) {
        console.error('Translation failed or message is empty');
        return;
      }
  
      const options = {
        message: translatedMessage
      };
  
      console.log("Referral Code:", this.value1);
      console.log("Share Options:", options);
  
      // Use the Social Sharing plugin to share the message
      this.socialSharing.shareWithOptions(options)
        .then(() => {
          this.modalCtrl.dismiss(); // Close modal on success
          this.Router.navigate(['profile']); // Navigate to profile page
        })
        .catch((error: any) => {
          console.error("Sharing failed:", error);
          this.modalCtrl.dismiss(); // Close modal
          this.errorMSGModal(
            this.translate.instant('ERROR_MODAL_BUTTON'),
            this.translate.instant('ERROR_SHARE_Code_MSG')
          );
        });
    }, (error) => {
      console.error("Translation Error:", error);
    });
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
  

}
