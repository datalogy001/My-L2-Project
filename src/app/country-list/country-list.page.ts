import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from '../api/services.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.page.html',
  styleUrls: ['./country-list.page.scss'],
})
export class CountryListPage implements OnInit {
  isModalOpen = true;
  @Input("value") value: any;
  zoneName: any = '';
  uniqueObjects: any = [];
  isLoading: any = true;
  constructor(private service: ServicesService, private modalCtrl: ModalController) { }

  ngOnInit() {
 this.uniqueObjects = window.localStorage.getItem("zoneCountry_"+this.value);
 this.uniqueObjects = JSON.parse(this.uniqueObjects);
 console.log("hiii");
 console.log(JSON.stringify(this.uniqueObjects));
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }




}
