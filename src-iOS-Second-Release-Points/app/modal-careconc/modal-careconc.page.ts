import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-modal-careconc',
  templateUrl: './modal-careconc.page.html',
  styleUrls: ['./modal-careconc.page.scss'],
})
export class ModalCareconcPage implements OnInit {

  constructor(private modalCtrl: ModalController,) { }

  closePopover() {
    this.modalCtrl.dismiss();
  }
  
  ngOnInit() {
  }

}
