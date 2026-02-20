import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";


@Component({
  selector: 'app-password-error-model',
  templateUrl: './password-error-model.page.html',
  styleUrls: ['./password-error-model.page.scss'],
})
export class PasswordErrorModelPage implements OnInit {

  @Input("value") value: any;
  @Input("value1") value1: any;
  constructor( private modalController: ModalController ) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
