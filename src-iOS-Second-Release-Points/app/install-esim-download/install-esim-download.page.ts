import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { QrCodeService } from '../api/qr-code.service';
import { TranslateService } from '@ngx-translate/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-install-esim-download',
  templateUrl: './install-esim-download.page.html',
  styleUrls: ['./install-esim-download.page.scss'],
})
export class InstallEsimDownloadPage implements OnInit {

  qrCodeImage: any = null;
  inputText: any;
  tempDetails: any = [];
  sharingData: any = [];
  iccid: any;
  userDetails:any=[]; 
txt:any;
  private longPressTimeout: any;
  private longPressTriggered: boolean = false;

  constructor(private fileOpener: FileOpener, private fileTransfer: FileTransfer, private file: File, private translate: TranslateService, private qrCodeService: QrCodeService, private iab: InAppBrowser, private clipboard: Clipboard, private Router: Router, private navController: NavController, private modalCtrl: ModalController, private emailComposer: EmailComposer, private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.tempDetails = this.Router.getCurrentNavigation()?.extras.state;
    this.sharingData = this.tempDetails.sharingData;
      this.userDetails = window.localStorage.getItem('L2TraveleSIM_userDetails');
        this.userDetails = JSON.parse(this.userDetails);

          if (this.sharingData.isUnlimited == false) {
      this.txt = this.sharingData.country + ": " + this.sharingData.dataamount + this.translate.instant('GB_for') + this.sharingData.days;
    } else {
      this.txt = this.sharingData.country + ":" + this.translate.instant('UNLIMITED_DAILY_PASS_FOR') + this.sharingData.days;
    }

    console.log(this.txt)

    this.iccid = this.tempDetails.iccid;
    this.generateQRCode();
  }

  async generateQRCode() {
    this.inputText = "LPA:1$" + this.sharingData.smdpAddress + "$" + this.sharingData.matchingId;
    console.log(this.inputText);
    if (this.inputText.trim() !== '') {
      try {
        this.qrCodeImage = await this.qrCodeService.generateQRCode(this.inputText);
      } catch (err) {
        // console.error('Error generating QR code:', err);
      }
    }
  }

  copyAddress() {
    const copyData = "LPA:1$" + this.sharingData.smdpAddress + "$" + this.sharingData.matchingId;
    this.clipboard.copy(copyData).then(
      () => {
        this.successMSGModal(this.translate.instant('SUCCESS_MSG'), this.translate.instant('SUCCESS_TITLE'), "1500");
      },
      (err) => {
        this.errorMSGModal(this.translate.instant('ERROR_TITLE'), this.translate.instant('ERROR_MSG'));
      }
    );
  }

  onTouchStart(event: TouchEvent) {
    this.longPressTriggered = false;
    this.longPressTimeout = setTimeout(() => {
      this.longPressTriggered = true;
      this.showContextMenu();
    }, 500); // 500ms for a long press
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.longPressTriggered) {
      clearTimeout(this.longPressTimeout);
    }
  }

  onTouchMove(event: TouchEvent) {
    clearTimeout(this.longPressTimeout);
  }

  async shareQRCode() {
    // Translate the email subject message and replace placeholders
    this.translate.get('EMAIL_SUBJECT', {
      email: this.userDetails.email,
       orderSummary: this.txt,
      iccid: this.sharingData.iccid,
      url: this.sharingData.qr_img_link// <== include URL here
    }).subscribe((translatedMessage: string) => {
       const options = {
      message: translatedMessage,
      // url is not needed here now, since we include it in the message as a clickable link
    };

      this.socialSharing.shareWithOptions(options)
        .then(() => {
        })
        .catch((error: any) => {
          this.errorMSGModal(this.translate.instant('ERROR_MODAL_BUTTON'), this.translate.instant('ERROR_SHARE_MSG'));
        });
    });
  }

  fileName: any;

  downloadQR() {
    // Get the current date and time
    const currentDateTime: Date = new Date();
    // Format the date and time to create a timestamp
    const timestamp: string = `${currentDateTime.getFullYear()}${(currentDateTime.getMonth() + 1).toString().padStart(2, '0')}${currentDateTime.getDate().toString().padStart(2, '0')}_${currentDateTime.getHours().toString().padStart(2, '0')}${currentDateTime.getMinutes().toString().padStart(2, '0')}${currentDateTime.getSeconds().toString().padStart(2, '0')}`;
    this.fileName = this.sharingData.iccid + timestamp + ".png";
    const imageUrl = this.sharingData.qr_img_link;
    const fileName = this.fileName;
    const targetFilePath = this.file.documentsDirectory + 'Download/' + fileName;
    this.downloadImage(imageUrl, fileName);
  }

  downloadImage(imageUrl: string, fileName: string) {
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const downloadPath = this.file.documentsDirectory + 'Download/' + fileName;
      fileTransfer.download(imageUrl, downloadPath).then(
        (entry) => {
          const fileType = 'image/png'; // Specify the MIME type for PNG files
          this.fileOpener.open(downloadPath, fileType)
      .then(() => console.log('eSIM QR code downloaded', "Success"))
      .catch(error => console.log('Error opening file' , "Error"))
          this.modalCtrl.dismiss();
        },
        (error) => {
         console.log('Error downloading image', "Error");
        }
      ); 
  }

  showContextMenu() {
    const contextMenu = document.createElement('div');
    contextMenu.classList.add('custom-context-menu');
    contextMenu.innerHTML = `
      <div class="context-menu">
        <button id="shareQRCode">` + this.translate.instant('SHARE_QR') + `<ion-icon name="share-outline"></ion-icon></button>
        <button id="downloadQR">` + this.translate.instant('SAVE_TO_PHOTOS') + ` <ion-icon name="download-outline"></ion-icon></button>
        <button id="copyAddress">` + this.translate.instant('COPY') + `<ion-icon name="copy-outline"></ion-icon></button>
        <button id="directInstall">` + this.translate.instant('ADD_ESIM') + `</button>
      </div>
    `;
  
    document.body.appendChild(contextMenu);
  
    const cleanup = () => {
      if (document.body.contains(contextMenu)) {
        document.body.removeChild(contextMenu);
      }
      document.removeEventListener('click', cleanup);
    };
  
    const shareQRCodeButton = document.getElementById('shareQRCode');
    const downloadQRButton = document.getElementById('downloadQR');
    const copyAddressButton = document.getElementById('copyAddress');
    const directInstallButton = document.getElementById('directInstall');
  
    if (shareQRCodeButton) {
      shareQRCodeButton.addEventListener('click', () => {
        this.shareQRCode();
        cleanup();
      });
    }
    if (downloadQRButton) {
      downloadQRButton.addEventListener('click', () => {
        this.downloadQR();
        cleanup();
      });
    }
    if (copyAddressButton) {
      copyAddressButton.addEventListener('click', () => {
        this.copyAddress();
        cleanup();
      });
    }
    if (directInstallButton) {
      directInstallButton.addEventListener('click', () => {
        this.directInstall();
        cleanup();
      });
    }
  
    document.addEventListener('click', cleanup, { once: true });
  }

  //directInstall
  directInstall() {
    const smdpAddress = this.sharingData.smdpAddress;// Example: 'rsp.truphone.com'
    const activationCode = this.sharingData.matchingId; // Example: 'JQ-209U6H-6I82J5'
    const universalLink = `https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=LPA:1$${smdpAddress}$${activationCode}`;
    // Open the Universal Link using InAppBrowser
    this.iab.create(universalLink, '_system');
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

  gotoBack() {
    this.navController.back();
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
