import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { NavController, ToastController, LoadingController, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-success-model-esim',
  templateUrl: './success-model-esim.page.html',
  styleUrls: ['./success-model-esim.page.scss'],
})
export class SuccessModelEsimPage implements OnInit {

  @Input("value") value: any;
  @Input("value1") value1: any;
  @Input("value2") value2: any;
  constructor( private modalController: ModalController ) { }


  ngOnInit() {
    setTimeout(() => {
      this.modalController.dismiss();
    }, this.value2);
  }

}
