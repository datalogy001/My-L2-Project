import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {
  @Input("value") value: any;
  selectedInput:any='';
  paymentList: any = [{'text':'PayPal', 'value':'PayPal'}];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.selectedInput = this.value;
  }

  dismissModal() {
    this.modalCtrl.dismiss({'paymentMethod' : this.selectedInput});
  }

  optionFocus(datas:any) {
    this.modalCtrl.dismiss({'paymentMethod' : datas});
  }
}
