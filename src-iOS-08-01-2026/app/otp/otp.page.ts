import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { ServicesService } from '../api/services.service';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})

export class OtpPage implements OnInit {




  num1: any = '';
  num2: any = '';
  num3: any = '';
  num4: any = '';
  tempOTP: any = '';
  tempParam: any = [];
  otp: any = '';


  constructor(private loadCtr: LoadingController, private service: ServicesService, private Router: Router, private navController: NavController, private toastController: ToastController) {

  }


  ngOnInit() {
    this.tempParam = this.Router.getCurrentNavigation()?.extras.state;
    this.otp = this.tempParam.otpCode;
    console.log("OTP page"+ this.otp);
  }

  otpChange(event:any,next:any,prev:any){
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     //return 0;
    } 
  }

  async submit() {
    if (this.validate()) {
      let navigationExtras: NavigationExtras = {
        state: {
          otpCode: this.otp
        }
      };
      this.presentToast("One-Time Password (OTP) has been verified", "Success");
      this.Router.navigate(['/reset-password'], navigationExtras);
    }

  }

  //Validation start
  validate() {

    if (this.num1.trim() == '') {
      this.presentToast("Please enter first field", "Error");
      return false;
    }
    else if (this.num2.trim() == '') {
      this.presentToast("Please enter second field", "Error");
      return false;
    }
    else if (this.num3.trim() == '') {
      this.presentToast("Please enter third field", "Error");
      return false;
    }
    else if (this.num4.trim() == '') {
      this.presentToast("Please enter four field", "Error");
      return false;
    }
    this.tempOTP = this.num1 + this.num2 + this.num3 + this.num4;

    if (this.tempOTP != this.otp) {
      this.presentToast("Please enter valid OTP", "Error");
      return false;
    }


    return true;

  }

  async presentToast(msg: any, status: any) {
    const toast = await this.toastController.create({
      header: status,
      message: msg,
      duration: status== 'Error' ? 1000: 2000,
      position: 'top',
      cssClass: status== 'Error' ? 'error-toast': 'success-toast'
    });

    await toast.present();
  }

  gotoBack() {
    this.navController.pop();
  }




}
