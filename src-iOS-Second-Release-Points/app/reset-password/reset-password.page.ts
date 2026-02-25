import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';
import { LoadingScreenAppPage } from '../loading-screen-app/loading-screen-app.page';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  tempParam: any = [];
  changePassword: any = { 'auth_otp': '', 'new_password': '', 'new_confirm_password': '', };
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';
  passwordType1: string = 'password';
  passwordIcon1: string = 'eye-off-outline';

  constructor(private loadingScreen: LoadingScreenAppPage,private loadCtr: LoadingController, private service: ServicesService, private Router: Router, private navController: NavController, private toastController: ToastController) {

  }

  ngOnInit() {
    this.tempParam = this.Router.getCurrentNavigation()?.extras.state;
    this.changePassword.auth_otp = this.tempParam.otpCode;
  }
  
  hideShowPassword() {
    this.passwordType = this.passwordType == 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon == 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }


  hideShowPassword1() {
    this.passwordType1 = this.passwordType1 == 'text' ? 'password' : 'text';
    this.passwordIcon1 = this.passwordIcon1 == 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  async presentToast(msg: any, status: any) {
    const toast = await this.toastController.create({
      header: status,
      message: msg,
      duration: status == 'Error' ? 1000 : 2000,
      position: 'top',
      cssClass: status == 'Error' ? 'error-toast' : 'success-toast'
    });

    await toast.present();
  }


  //Validation start
  validate() {
    if (this.changePassword.new_password.trim() == '') {
      this.loadingScreen.dismissLoading();
      this.presentToast("Please enter new password", "Error");
      return false;
    }

    else if (this.changePassword.new_confirm_password.trim() == '') {
      this.loadingScreen.dismissLoading();
      this.presentToast("Please enter confirm password", "Error");
      return false;
    }

    else if (this.changePassword.new_password.trim() != this.changePassword.new_confirm_password.trim()) {
      this.loadingScreen.dismissLoading();
      this.presentToast("Password update failed. New password and confirm password do not match. Please try again.", "Error");
      return false;
    }


    return true;

  }


  async submit() {
    this.Router.navigate(['/reset-password-success']);

  /*  await this.loadingScreen.presentLoading();
    if (this.validate()) {
      //API call for Reset password section
      this.service.retrivePassword(this.changePassword).then((res: any) => {
        this.loadingScreen.dismissLoading();
        if (res.code == 200) {
          this.presentToast("Password changed, please login with new password", "Success");
          this.Router.navigate(['/start']);
        } else {
          this.presentToast("Password changed unsuccessful. Please contact support for assistance.", "Error");
        }
      }).catch(err => {
        this.loadingScreen.dismissLoading();
        //alert("Error from API" + JSON.stringify(err));
        this.presentToast("Password reset unsuccessful. Please contact support for assistance.", "Error");
      })

    } */

  }

  async presentLoader() {
    const loading = await this.loadCtr.create({
      message: 'Please wait', // Customize the message as needed
    });
    await loading.present();
    return loading;
  }

  gotoBack() {
    this.navController.pop();
  }




}
