import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-del-model-coupen',
  templateUrl: './del-model-coupen.page.html',
  styleUrls: ['./del-model-coupen.page.scss'],
})
export class DelModelCoupenPage implements OnInit {

  constructor(private navParams: NavParams, private modalController: ModalController,  private translate: TranslateService) {}
  couponCode: any;
  deleteMessage:any;
  deletPhoto() {
    this.modalController.dismiss({ action: 'YES' });
  }

  goBack() {
    this.modalController.dismiss({ action: 'NO' });
  }
  
  ngOnInit() {
    this.couponCode = this.navParams.get('coupon'); // Retrieve the coupon

    // Translate with dynamic value
    this.translate.get('DELETE_COUPON_CONFIRM', { coupon: this.couponCode }).subscribe((res) => {
      this.deleteMessage = res;
    });
  }

}
