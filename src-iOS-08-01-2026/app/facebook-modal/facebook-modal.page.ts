import { Component, OnInit, Input} from '@angular/core';
import { Platform, NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { PasswordErrorPage } from '../password-error/password-error.page';
import { SuccessModelPage } from '../success-model/success-model.page';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-facebook-modal',
  templateUrl: './facebook-modal.page.html',
  styleUrls: ['./facebook-modal.page.scss'],
})
export class FacebookModalPage implements OnInit {
  @Input("value") value: any;
  @Input("value1") value1: any;
  facebookObj : any = { 'userId': '', 'first_name': '', 'email': '' };
  isInputDisabled: boolean = true; // or false based on your condition
  constructor(private translate: TranslateService,private modalController: ModalController, private platform: Platform, private loadCtr: LoadingController, private Router: Router, private navController: NavController, private toastController: ToastController) { }

  ngOnInit() {
    this.facebookObj.userId = this.value;
    this.facebookObj.first_name = this.value1;
  }

  async submit() {
    if (this.validate()) {
      this.modalController.dismiss({ 'data': this.facebookObj, 'isDone' : true });
    }

  }

  gotoBack()
  {
    this.modalController.dismiss({ 'data': this.facebookObj, 'isDone' : false });
  }

  // Error Modal
  async errorMSGModal(buttonText: any, msg: any) {
    const modal = await this.modalController.create({
      component: PasswordErrorPage,
      componentProps: { 'value': msg , 'value1': buttonText}
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

  //Validation start
  validate() {
    let emailValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    
    if (this.facebookObj.first_name.trim() == '') {
      this.errorMSGModal(this.translate.instant('VALIDATION_MSG_BUTTON_OK'), this.translate.instant('VALIDATION_MSG_ENTER_FIRST_NAME'));
      return false;
    }
    else if (this.facebookObj.email.trim() == '') {
      this.errorMSGModal( this.translate.instant('VALIDATION_MSG_BUTTON_OK'),this.translate.instant('VALIDATION_MSG_ENTER_EMAIL'));
      return false;
    }
    else if (!emailValid.test(this.facebookObj.email) && (this.facebookObj.email != '')) {
      this.errorMSGModal(this.translate.instant('VALIDATION_MSG_BUTTON_OK'),this.translate.instant('VALIDATION_MSG_ENTER_VALID_EMAIL'));
      return false;
    }

    return true;

  }

}
