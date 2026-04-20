import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-modal-country-opt',
  templateUrl: './modal-country-opt.page.html',
  styleUrls: ['./modal-country-opt.page.scss'],
})
export class ModalCountryOptPage implements OnInit {

  constructor(private modalCtrl: ModalController, private navCtrl: NavController) { }



  procceed() {
    this.modalCtrl.dismiss({ action: 'procceed' });
  }

  goBack() {
    this.modalCtrl.dismiss({ action: 'go_back' });
  }
  
  ngOnInit() {
  }

}