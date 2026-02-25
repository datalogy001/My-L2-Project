import { Component, OnInit, Input } from '@angular/core';
import { Platform, NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-apple-model',
  templateUrl: './apple-model.page.html',
  styleUrls: ['./apple-model.page.scss'],
})
export class AppleModelPage implements OnInit {

  @Input("value") value: any;
  appleObj: any = { 'apple_id': '', 'first_name': '', 'email': '' };
  constructor(private modalController: ModalController, private platform: Platform, private loadCtr: LoadingController, private Router: Router, private navController: NavController, private toastController: ToastController) { }

  ngOnInit() {
    this.appleObj.apple_id = this.value;

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
      this.presentToast("Please enter first name", "Error");
      return false;
    }
    else if (this.appleObj.email.trim() == '') {
      this.presentToast("Please enter email", "Error");
      return false;
    }
    else if (!emailValid.test(this.appleObj.email) && (this.appleObj.email != '')) {
      this.presentToast("Please enter valid email", "Error");
      return false;
    }

    return true;

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
}