import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import { VerificationResetPage } from '../verification-reset/verification-reset.page';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { TranslateService } from '@ngx-translate/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPass: any = { 'email': '' };

  constructor(
    private loadingScreen: LoadingScreenAppPage,
    private modalController: ModalController,
    private loadCtr: LoadingController,
    private service: ServicesService,
    private Router: Router,
    private navController: NavController,
    private toastController: ToastController,
    private translate: TranslateService,
    private keyboard: Keyboard // Add this line
  ) { }

  ngOnInit() {
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

  async submit() {
    if (this.validate()) {
      // API call for forgot password
      await this.loadingScreen.presentLoading();
      this.service.forgotPass(this.forgotPass).then((res: any) => {
        this.loadingScreen.dismissLoading();
        if (res.code == 200) {
          this.Router.navigate(['/forgot-linksend']);
        } else {
          this.errorMSGModal(
            this.translate.instant('TRY_AGAIN_BUTTON'),
            this.translate.instant('EMAIL_NOT_FOUND_ERROR')
          );
        }
      }).catch(err => {
        this.forgotPass.email = '';
        this.loadingScreen.dismissLoading();
        this.errorMSGModal(
          this.translate.instant('TRY_AGAIN_BUTTON'),
          this.translate.instant('EMAIL_NOT_FOUND_ERROR')
        );
      });
    }
  }

  // Validation start
  validate() {
    let emailValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (this.forgotPass.email.trim() == '') {
      this.errorMSGModal(
        this.translate.instant('OK_BUTTON'),
        this.translate.instant('ENTER_EMAIL_ERROR')
      );
      return false;
    } else if (!emailValid.test(this.forgotPass.email) && (this.forgotPass.email != '')) {
      this.errorMSGModal(
        this.translate.instant('OK_BUTTON'),
        this.translate.instant('VALID_EMAIL_ERROR')
      );
      return false;
    }
    return true;
  }

  gotoTab1() {
    this.navController.navigateRoot('tab1');
  }

  gotoTab5() {
    this.navController.navigateRoot('tab5');
  }

  gotoHomeSearch() {
    this.navController.navigateRoot('home-search');
  }

  // Error Modal
  async errorMSGModal(buttonText: any, msg: any) {
    const modal = await this.modalController.create({
      component: PasswordErrorPage,
      componentProps: { 'value': msg, 'value1': buttonText }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  // Success Modal
  async successMSGModal(buttonText: any, msg: any) {
    const modal = await this.modalController.create({
      component: SuccessModelPage,
      componentProps: { 'value': msg, 'value1': buttonText }
    });

    modal.onDidDismiss();
    return await modal.present();
  }

  gotoBack() {
    this.navController.pop();
  }

  clearInput() {
    this.forgotPass.email = '';
  }
}
