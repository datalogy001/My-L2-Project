import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-qr-loader',
  templateUrl: './qr-loader.page.html',
  styleUrls: ['./qr-loader.page.scss'],
})
export class QrLoaderPage implements OnInit {

  constructor(private modcntr: ModalController) { }

  ngOnInit() {
    setTimeout(() => {
      this.modcntr.dismiss();
    }, 15000);
  }

}
