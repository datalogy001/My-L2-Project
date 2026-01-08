import { Component, OnInit, Input } from '@angular/core';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Platform, NavController, ToastController, PopoverController, ModalController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { QrCodeService } from '../api/qr-code.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-sharenow',
  templateUrl: './sharenow.page.html',
  styleUrls: ['./sharenow.page.scss'],
})
export class SharenowPage implements OnInit {
  imagePath: any = '';
  textMsg: any = '';
  @Input("value") value: any;
  @Input("value1") value1: any;
  @Input("value2") value2: any;
  @Input("value3") value3: any;
  @Input("value4") value4: any;
  tempDetails:any=[];
  qrCodeImage: any = null;
  inputText:any;

  constructor(private translate: TranslateService,private qrCodeService: QrCodeService,private loadingScreen: LoadingScreenAppPage, private Router: Router,private emailComposer: EmailComposer, private platform: Platform, private socialSharing: SocialSharing, private modalCtrl: ModalController, private toastcntr: ToastController) { }


  ngOnInit() {
    // Assuming imagePath is the path to your image
    this.tempDetails = window.localStorage.getItem('L2TraveleSIM_userDetails');
    this.tempDetails = JSON.parse(this.tempDetails);
    this.generateQRCode();
  }

  async generateQRCode() {
    this.inputText = "LPA:1$"+this.value3+"$"+this.value4;
    console.log(this.inputText);
    if (this.inputText.trim() !== '') {
      try {
        this.qrCodeImage = await this.qrCodeService.generateQRCode(this.inputText);
      } catch (err) {
       // console.error('Error generating QR code:', err);
      }
    }
  }

  closePopover(values: any) {
    this.modalCtrl.dismiss();
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


async sharewithall() {
  await this.loadingScreen.presentLoading();
  setTimeout(() => {
    this.loadingScreen.dismissLoading();
  }, 500);

  this.translate.get('EMAIL_SUBJECT', {
    email: this.tempDetails.email,
    orderSummary: this.value1,
    iccid: this.value,
    url: this.value2 // <== include URL here
  }).subscribe((translatedMessage: string) => {
    const options = {
      message: translatedMessage,
      // url is not needed here now, since we include it in the message as a clickable link
    };

    console.log(options);

    this.socialSharing.shareWithOptions(options)
      .then(() => {
        this.modalCtrl.dismiss();
        this.Router.navigate(['tab1']);
      })
      .catch((error: any) => {
        this.modalCtrl.dismiss();
        this.errorMSGModal(
          this.translate.instant('ERROR_MODAL_BUTTON'),
          this.translate.instant('ERROR_SHARE_MSG')
        );
      });
  });
}


}
