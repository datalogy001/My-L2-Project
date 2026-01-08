import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-modal-upload-profile-image',
  templateUrl: './modal-upload-profile-image.page.html',
  styleUrls: ['./modal-upload-profile-image.page.scss'],
})
export class ModalUploadProfileImagePage implements OnInit {

  constructor(private modalCtrl: ModalController, private navCtrl: NavController) { }

  closePopover() {
    this.modalCtrl.dismiss();
  }

  selectPhoto() {
    this.modalCtrl.dismiss({ action: 'choose_photo' });
  }

  takePhoto() {
    this.modalCtrl.dismiss({ action: 'take_photo' });
  }
  
  ngOnInit() {
  }

}
