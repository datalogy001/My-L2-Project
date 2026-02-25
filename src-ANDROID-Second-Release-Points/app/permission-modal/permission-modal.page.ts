import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-permission-modal',
  templateUrl: './permission-modal.page.html',
  styleUrls: ['./permission-modal.page.scss'],
})
export class PermissionModalPage implements OnInit {

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  closePopover(values: any) {
    this.modalCtrl.dismiss({ inputValue: values });
  }


}
