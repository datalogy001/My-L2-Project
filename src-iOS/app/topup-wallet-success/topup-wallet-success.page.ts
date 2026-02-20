import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-topup-wallet-success',
  templateUrl: './topup-wallet-success.page.html',
  styleUrls: ['./topup-wallet-success.page.scss'],
})
export class TopupWalletSuccessPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  gotoProfile()
  {
    this.navController.navigateRoot('profile');
  }
}
