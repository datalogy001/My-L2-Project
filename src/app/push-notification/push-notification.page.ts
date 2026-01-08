import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.page.html',
  styleUrls: ['./push-notification.page.scss'],
})
export class PushNotificationPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  closePopover(values:any)
  {
      this.modalController.dismiss({ inputValue: values });
  }

}
