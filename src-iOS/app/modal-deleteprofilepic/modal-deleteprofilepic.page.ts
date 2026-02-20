import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-modal-deleteprofilepic',
  templateUrl: './modal-deleteprofilepic.page.html',
  styleUrls: ['./modal-deleteprofilepic.page.scss'],
})
export class ModalDeleteprofilepicPage implements OnInit {

  constructor(private modalCtrl: ModalController, private navCtrl: NavController) { }



  deletPhoto() {
    this.modalCtrl.dismiss({ action: 'deletePhoto' });
  }

  goBack() {
    this.modalCtrl.dismiss({ action: 'go_back' });
  }
  
  ngOnInit() {
  }

}
