import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.page.html',
  styleUrls: ['./delete-card.page.scss'],
})
export class DeleteCardPage implements OnInit {

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
  }

  closePopover(values: any) {
    this.modalCtrl.dismiss(values);
  }


}
