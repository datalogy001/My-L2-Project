import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-choose-card',
  templateUrl: './choose-card.page.html',
  styleUrls: ['./choose-card.page.scss'],
})
export class ChooseCardPage implements OnInit {

  constructor( private navController: NavController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  gotoBack() {
    this.navController.pop();
  }
  
    dismissModal() {
      this.modalCtrl.dismiss();
    }
  
    gotoTab1() {
      this.navController.navigateRoot('tab1');
    }
    gotoTab5() {
      this.navController.navigateRoot('tab5');
    }

}
