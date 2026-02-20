import { Component, OnInit, Input } from '@angular/core';
import { Platform, NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { SuccessModelPage } from '../success-model/success-model.page';

@Component({
  selector: 'app-apple-model',
  templateUrl: './apple-model.page.html',
  styleUrls: ['./apple-model.page.scss'],
})
export class AppleModelPage implements OnInit {

  @Input("value") value: any;
  appleObj: any = { 'apple_id': '', 'first_name': '', 'email': '' };
    constructor(private translate: TranslateService,private modalController: ModalController, private platform: Platform, private loadCtr: LoadingController, private Router: Router, private navController: NavController, private toastController: ToastController) { }

  ngOnInit() {
    this.appleObj.apple_id = this.value;

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
    async successMSGModal(buttonText: any, msg: any, times: any) {
        const modal = await this.modalController.create({
            component: SuccessModelPage,
            componentProps: { 'value': msg, 'value1': buttonText, 'value2': times }
        });

        modal.onDidDismiss();
        return await modal.present();
    }
  async submit() {
    if (this.validate()) {
      this.modalController.dismiss({ 'data': this.appleObj, 'isDone': true });
    }

  }

  gotoBack() {
    this.modalController.dismiss({ 'data': this.appleObj, 'isDone': false });
  }

  //Validation start
  validate() {
    let emailValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (this.appleObj.first_name.trim() == '') {
        this.errorMSGModal(this.translate.instant('VALIDATION_MSG_BUTTON_OK'), this.translate.instant('VALIDATION_MSG_ENTER_FIRST_NAME'));
   return false;
    }
    else if (this.appleObj.email.trim() == '') {
        this.errorMSGModal(this.translate.instant('VALIDATION_MSG_BUTTON_OK'), this.translate.instant('VALIDATION_MSG_ENTER_EMAIL'));
      return false;
    }
    else if (!emailValid.test(this.appleObj.email) && (this.appleObj.email != '')) {
        this.errorMSGModal(this.translate.instant('VALIDATION_MSG_BUTTON_OK'), this.translate.instant('VALIDATION_MSG_ENTER_VALID_EMAIL'));
      return false;
    }

    return true;

  }

  
}