
import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { QrCodeService } from '../api/qr-code.service';
import { TranslateService } from '@ngx-translate/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-install-esim',
  templateUrl: './install-esim.page.html',
  styleUrls: ['./install-esim.page.scss'],
})
export class InstallEsimPage implements OnInit {

  qrCodeImage: any = null;
  inputText:any;
  selectedSegment: string = 'qrcode';
  tempDetails: any = [];
  sharingData: any = [];
  iccid: any;
  userDetails:any=[];
  constructor(private socialSharing: SocialSharing,private loadingScreen: LoadingScreenAppPage,private translate: TranslateService,private qrCodeService: QrCodeService,private iab: InAppBrowser,private clipboard: Clipboard, private Router: Router, private navController: NavController, private modalCtrl: ModalController) { }

 ngOnInit() {
    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.sharingData = this.tempDetails.sharingData;
    this.userDetails = window.localStorage.getItem('L2TraveleSIM_userDetails');
    this.userDetails = JSON.parse(this.userDetails);

    this.iccid = this.tempDetails.iccid;
    this.generateQRCode();
  }
  
  async generateQRCode() {
    this.inputText = "LPA:1$"+this.sharingData.smdpAddress+"$"+this.sharingData.matchingId;
    console.log(this.inputText);
    if (this.inputText.trim() !== '') {
      try {
        this.qrCodeImage = await this.qrCodeService.generateQRCode(this.inputText);
      } catch (err) {
       // console.error('Error generating QR code:', err);
      }
    }
  }

  txt:any;
  
  async sharewithall() {

    await this.loadingScreen.presentLoading();
    setTimeout(() => {
      this.loadingScreen.dismissLoading();
    }, 400);

    if ( this.sharingData.isUnlimited == false) {
      this.txt = this.sharingData.country + ": " +  this.sharingData.dataamount + this.translate.instant('GB_for') +  this.sharingData.days;
    } else {
      this.txt =  this.sharingData.country+ ":" + this.translate.instant('UNLIMITED_DAILY_PASS_FOR') +  this.sharingData.days;
    }



    // Translate the email subject message and replace placeholders
    this.translate.get('EMAIL_SUBJECT', {
      email: this.userDetails.email,
      orderSummary: this.txt,
      iccid: this.iccid,
       url: this.sharingData.qr_img_link
    }).subscribe((translatedMessage: string) => {
      const options = {
        message: translatedMessage
      };

      console.log(options);
      
      this.socialSharing.shareWithOptions(options)
        .then(() => {
          this.modalCtrl.dismiss();
        })
        .catch((error: any) => {
          this.modalCtrl.dismiss();
          this.errorMSGModal(this.translate.instant('ERROR_MODAL_BUTTON'), this.translate.instant('ERROR_SHARE_MSG'));
        });
    });
  }

 
  copyAddress() {
    //let copydata = "LPA:1$consumer."+this.sharingData.smdpAddress + this.sharingData.matchingId;
    let copydata = "LPA:1$"+this.sharingData.smdpAddress+"$"+this.sharingData.matchingId;
    console.log(copydata);
    this.clipboard.copy(copydata).then(
      () => {
        this.successMSGModal(this.translate.instant('SUCCESS_MSG'),this.translate.instant('SUCCESS_TITLE'),"1500");
      },
      (err) => {
        this.errorMSGModal(this.translate.instant('ERROR_TITLE'),this.translate.instant('ERROR_MSG'));
         }
    );
  }


   //directInstall
    directInstall() {
        const smdpAddress = this.sharingData.smdpAddress;// Example: 'rsp.truphone.com'
        const activationCode =  this.sharingData.matchingId; // Example: 'JQ-209U6H-6I82J5'
            const universalLink = `https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=LPA:1$${smdpAddress}$${activationCode}`;
            // Open the Universal Link using InAppBrowser
            this.iab.create(universalLink, '_system');
    } 


    gotoMarketPlace()
	  {
	    this.navController.navigateRoot('marketplace');
	  }

  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }
  gotoTab5() {
 if(window.localStorage.getItem('L2TraveleSIM_auth_token')== null || window.localStorage.getItem('L2TraveleSIM_auth_token')== '') 
this.navController.navigateRoot('tab5');
else
this.navController.navigateRoot('profile');
  }

  gotoHomeSearch()
  {
    this.navController.navigateRoot('home-search');
  }
  gotoBack()
  {
    this.navController.back();
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

}
