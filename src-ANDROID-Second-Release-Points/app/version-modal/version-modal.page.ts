import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";


@Component({
  selector: 'app-version-modal',
  templateUrl: './version-modal.page.html',
  styleUrls: ['./version-modal.page.scss'],
})
export class VersionMOdalPage implements OnInit {
  @Input("value") value: any;
  @Input("value1") value1: any;
  constructor( private modalController: ModalController ) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
