import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
@Component({
  selector: 'app-topup-not-applied-modal',
  templateUrl: './topup-not-applied-modal.page.html',
  styleUrls: ['./topup-not-applied-modal.page.scss'],
})
export class TopupNotAppliedModalPage implements OnInit {
  
 constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
  }

  closePopover(values: any) {
    this.modalCtrl.dismiss(values);
  }


}

