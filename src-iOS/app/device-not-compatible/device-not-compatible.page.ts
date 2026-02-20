import { Component, OnInit } from '@angular/core';
import { NavController,ToastController, LoadingController, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-device-not-compatible',
  templateUrl: './device-not-compatible.page.html',
  styleUrls: ['./device-not-compatible.page.scss'],
})
export class DeviceNotCompatiblePage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  gotoHomeSearch()
  {
    this.navController.navigateRoot('home-search');
  }

  gotoBack()
  {
    this.navController.pop();
  }
}
