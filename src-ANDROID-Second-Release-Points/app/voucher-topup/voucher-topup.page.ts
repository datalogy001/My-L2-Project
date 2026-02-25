import { Component, OnInit, } from '@angular/core';
import { Platform, NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import { HttpClient, HttpParams } from '@angular/common/http'
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
import { TranslateService } from '@ngx-translate/core';
import { PasswordErrorPage } from '../password-error/password-error.page';

@Component({
  selector: 'app-voucher-topup',
  templateUrl: './voucher-topup.page.html',
  styleUrls: ['./voucher-topup.page.scss'],
})
export class VoucherTopupPage implements OnInit {
  voucherObj: any = { 'voucher_code': '', 'currency': '' };

  constructor(private translate: TranslateService, private loadingScreen: LoadingScreenAppPage, private http: HttpClient, private modalController: ModalController, private platform: Platform, private loadCtr: LoadingController, private service: ServicesService, private Router: Router, private navController: NavController, private toastController: ToastController) {
  }
  tokenValue: any;
  ngOnInit() {
    this.tokenValue = window.localStorage.getItem('L2TraveleSIM_auth_token');
    //Current currency 
    if (window.localStorage.getItem("L2TraveleSIM_currency") == null) {
      this.voucherObj.currency = 'USD';
    } else {
      this.voucherObj.currency = window.localStorage.getItem("L2TraveleSIM_currency");
    }
  }

  type: any;

  // Validate form inputs
  async submit() {
    await this.loadingScreen.presentLoading();
    if (this.validate()) {

      this.service.validate_voucher_code(this.voucherObj, this.tokenValue).then((res: any) => {
        this.loadingScreen.dismissLoading();
        if (res.code == 200) {
          if (res.data.length > 0) {
            const navigationExtras: NavigationExtras = {
              state: {
                voucherResult: res.data[0]
              }
            };
            this.Router.navigate(['/voucher-reveal'], navigationExtras);
          }
        }
        else {

          this.loadingScreen.dismissLoading();
          this.voucherObj.voucher_code = '';
          this.errorMSGModal(this.translate.instant("VOUCHER_NOT_FOUND"), this.translate.instant('VALIDATION_MSG_BUTTON'));
        }
      }).catch(err => {
        this.loadingScreen.dismissLoading();
        if (err['error']['code'] == 422) {
          this.loadingScreen.dismissLoading();
          this.voucherObj.voucher_code = '';
          this.errorMSGModal(this.translate.instant("VOUCHER_REUSE_ERROR"), this.translate.instant('VALIDATION_MSG_BUTTON'));
        } else {

          this.loadingScreen.dismissLoading();
          this.voucherObj.voucher_code = '';
          this.errorMSGModal(this.translate.instant("VOUCHER_NOT_FOUND"), this.translate.instant('VALIDATION_MSG_BUTTON'));
        }

      })
    }
  }



  validate() {
    const code = this.voucherObj.voucher_code.trim();

    if (code === '') {
      this.errorMSGModal(
        this.translate.instant('validate_top-up_code'),
        this.translate.instant('VALIDATION_MSG_BUTTON_OK')
      );
      this.loadingScreen.dismissLoading();
      return false;
    }

    if (code.length !== 16) {
      this.errorMSGModal(
        this.translate.instant('validate_voucher_length'), // Add this key in translations
        this.translate.instant('VALIDATION_MSG_BUTTON_OK')
      );
      this.loadingScreen.dismissLoading();
      return false;
    }

    return true;
  }

  gotoBack() {
    this.navController.pop();
  }

  // Display error message modal
  async errorMSGModal(header: string, message: string) {
    const modal = await this.modalController.create({
      component: PasswordErrorPage,
      componentProps: {
        'value': header,
        'value1': message,
      }
    });
    await modal.present();
  }
}
