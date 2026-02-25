import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-confirm-continue',
  templateUrl: './confirm-continue.page.html',
  styleUrls: ['./confirm-continue.page.scss'],
})
export class ConfirmContinuePage implements OnInit {

  constructor( private modalCtrl: ModalController, private navController: NavController) { }

  ngOnInit() {
    setTimeout(() => {
      this.modalCtrl.dismiss();
    
    }, 500);
  }

}
